import { envs } from "../../config/envs";
import { AIProvider } from "./interfaces/ai.provider";
import { MockAIService } from "./mock-ai.service";
import { OpenAIService } from "./openai.service";

export class AIServiceFactory {
    static create(): AIProvider {
      const useRealAI = envs.nodeEnv === 'production' && envs.openaiApiKey;
      
      if (useRealAI) {
        return new OpenAIService();
      } else {
        return new MockAIService();
      }
    }
}