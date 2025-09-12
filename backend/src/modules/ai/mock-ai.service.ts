import { AIAnalysisResult, AIProvider } from "./interfaces/ai.provider";

export class MockAIService implements AIProvider {
    async analyzeEvent(eventText: string, watchlistTerms: string[]): Promise<AIAnalysisResult> {

        // Simulate AI analysis delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 10000));

        // Logic keyword based
        const text = eventText.toLowerCase();
        
        let severity: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL' = 'LOW';
        let summary = '';
        let suggestions = '';

        // Determinate severity based on keywords
        if (text.includes('critical') || text.includes('breach') || text.includes('attack')) {
            severity = 'CRITICAL';
            summary = 'Evento crítico de seguridad detectado que requiere atención inmediata.';
            suggestions = 'Activar protocolo de respuesta a incidentes, notificar al equipo de seguridad y evaluar el alcance del impacto.';
        } else if (text.includes('malware') || text.includes('suspicious') || text.includes('phishing')) {
            severity = 'HIGH';
            summary = 'Actividad maliciosa detectada que representa una amenaza significativa.';
            suggestions = 'Investigar la fuente, bloquear IPs/dominios sospechosos y monitorear actividad relacionada.';
        } else if (text.includes('anomaly') || text.includes('unusual') || text.includes('warning')) {
            severity = 'MED';
            summary = 'Comportamiento anómalo detectado que requiere investigación.';
            suggestions = 'Analizar patrones de tráfico, verificar logs adicionales y establecer monitoreo continuo.';
        } else {
            severity = 'LOW';
            summary = 'Evento informativo registrado para análisis de tendencias.';
            suggestions = 'Documentar para análisis posterior y mantener en observación.';
        }

        const matchedTerms = watchlistTerms.filter(term => 
            text.includes(term.toLowerCase())
        );

        if (matchedTerms.length > 0) {
            summary += ` Relacionado con términos vigilados: ${matchedTerms.join(', ')}.`;
        }

        return {
            summary,
            severity,
            suggestions
        }
    }

}