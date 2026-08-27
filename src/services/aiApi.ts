/**
 * AI Legal Assistant Service - Modular Entrypoint
 * Re-exports the modular AI legal assistant facade for backwards compatibility.
 */

import { aiLegalAssistantService, LegalQueryOptions } from './ai';

export const aiApi = {
  async askQuestion(question: string, options?: LegalQueryOptions) {
    return aiLegalAssistantService.askQuestion(question, options);
  },

  getConfig() {
    return aiLegalAssistantService.getConfig();
  },

  isMockService() {
    return aiLegalAssistantService.isMockService();
  },
};

export * from './ai/types';
