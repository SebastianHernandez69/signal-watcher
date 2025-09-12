import { envs } from "../../config/envs";
import { BadRequestError, InternalServerError, TooManyRequestsError, UnauthorizedError } from "../../utils/errors";
import { AIAnalysisResult, AIProvider } from "./interfaces/ai.provider";

export class OpenAIService implements AIProvider {
    private apiKey: string;
    private baseURL: string;
  
    constructor() {
      this.apiKey = envs.openaiApiKey;
      this.baseURL = 'https://api.openai.com/v1';
    }
  
    async analyzeEvent(eventText: string, watchlistTerms: string[]): Promise<AIAnalysisResult> {
      const prompt = this.buildPrompt(eventText, watchlistTerms);
      
      try {
        const response = await fetch(`${this.baseURL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: envs.openaiModel || 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'Eres un analista de ciberseguridad experto. Analiza eventos de seguridad y proporciona análisis estructurados.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.3,
            max_tokens: 500
          })
        });
  
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new UnauthorizedError("Invalid or missing OpenAI API key");
            }
            if (response.status === 429) {
              throw new TooManyRequestsError("OpenAI API rate limit exceeded");
            }
            if (response.status >= 500) {
              throw new InternalServerError("OpenAI service unavailable");
            }
            throw new BadRequestError(`OpenAI API request failed with status ${response.status}`);
          }
  
        const data = (await response.json()) as { choices: { message: { content: string } }[] };
        const aiResponse = data.choices[0].message.content;
        
        return this.parseAIResponse(aiResponse);
      } catch (error: any) {
        if(error instanceof Error){
            throw error;
        }
        
        throw new InternalServerError(`AI analysis failed: ${error.message}`);
      }
    }
  
    private buildPrompt(eventText: string, watchlistTerms: string[]): string {
      return `
        Analiza el siguiente evento de seguridad y proporciona:
        
        EVENTO: ${eventText}
        
        TÉRMINOS DE VIGILANCIA: ${watchlistTerms.join(', ')}
        
        Por favor responde EXACTAMENTE en este formato JSON:
        {
            "summary": "Resumen claro y conciso del evento en 1-2 oraciones",
            "severity": "LOW|MED|HIGH|CRITICAL",
            "suggestions": "Acción específica recomendada para el analista"
        }
        
        CRITERIOS DE SEVERIDAD:
        - LOW: Evento informativo, sin amenaza inmediata
        - MED: Requiere investigación, posible riesgo
        - HIGH: Amenaza confirmada, acción urgente necesaria  
        - CRITICAL: Amenaza crítica, respuesta inmediata requerida
        
        La severidad debe basarse en la relación con los términos vigilados y el impacto potencial.
      `.trim();
    }
  
    private parseAIResponse(aiResponse: string): AIAnalysisResult {
      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new BadRequestError('No JSON found in AI response');
        }
  
        const parsed = JSON.parse(jsonMatch[0]);
        
        if (!parsed.summary || !parsed.severity || !parsed.suggestions) {
          throw new BadRequestError('Missing required fields in AI response');
        }
  
        const validSeverities = ['LOW', 'MED', 'HIGH', 'CRITICAL'];
        if (!validSeverities.includes(parsed.severity)) {
          parsed.severity = 'MED'; 
        }
  
        return {
          summary: parsed.summary.substring(0, 500), 
          severity: parsed.severity as 'LOW' | 'MED' | 'HIGH' | 'CRITICAL',
          suggestions: parsed.suggestions.substring(0, 500)
        };
      } catch (error) {
        
        return {
          summary: 'Error al procesar el análisis de IA',
          severity: 'MED',
          suggestions: 'Revisar manualmente el evento'
        };
      }
    }
}