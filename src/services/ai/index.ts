import { aiConfig, validateAIConfig } from '@/config/aiConfig';
import { AIProvider, AIResponse, LegalQueryOptions } from './types';
import { mockProvider } from './providers/mockProvider';
import { geminiProvider } from './providers/geminiProvider';
import { openaiProvider } from './providers/openaiProvider';
import { anthropicProvider } from './providers/anthropicProvider';

export * from './types';

/**
 * Strategy pattern mapping available AI providers
 */
const providers: Record<string, AIProvider> = {
  mock: mockProvider,
  gemini: geminiProvider,
  openai: openaiProvider,
  anthropic: anthropicProvider,
};

/**
 * Main AI Legal Assistant Service Facade
 */
export const aiLegalAssistantService = {
  async askQuestion(question: string, options?: LegalQueryOptions): Promise<AIResponse> {
    const validation = validateAIConfig();
    const serviceName = aiConfig.service;

    // Use mock provider if invalid config or explicitly configured as mock
    if (!validation.valid || serviceName === 'mock') {
      return mockProvider.askQuestion(question, options);
    }

    const provider = providers[serviceName];
    if (!provider) {
      return mockProvider.askQuestion(question, options);
    }

    return provider.askQuestion(question, options);
  },

  getConfig() {
    const serviceName = aiConfig.service;
    const config = aiConfig[serviceName];
    return {
      service: serviceName,
      configured: aiConfig.isConfigured(),
      endpoint: config?.endpoint,
      model: config?.model,
    };
  },

  isMockService(): boolean {
    return aiConfig.useMockService();
  },
};
