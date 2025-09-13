import { envs } from "../../config/envs";
import { AIProvider } from "./interfaces/ai.provider";
import { MockAIService } from "./mock-ai.service";
import { OpenAIService } from "./openai.service";

export class AIServiceFactory {
    static create(): AIProvider {
      const hasValidOpenAIKey = envs.openaiApiKey 
        && envs.openaiApiKey !== '' 
        && !envs.openaiApiKey.startsWith('sk-');

      const useRealAI = envs.nodeEnv === 'production' && hasValidOpenAIKey;
      
      if (useRealAI) {
        return new OpenAIService();
      } else {
        return new MockAIService();
      }
    }
}