/**
 * AI Legal Assistance Types
 * Modular type definitions for provider routing, response formatting, and UI options
 */

export type LegalAssistanceMode = 'conversational' | 'action_steps' | 'legal_reference';

export interface LegalActReference {
  act: string;
  section?: string;
  description: string;
}

export interface StructuredLegalResponse {
  narrative: string;
  summary?: string;
  relevantActs?: LegalActReference[];
  actionSteps?: string[];
  followUp: string[];
  disclaimer?: string;
}

export interface AIResponse {
  success: boolean;
  data?: StructuredLegalResponse;
  error?: string;
}

export interface LegalQueryOptions {
  mode?: LegalAssistanceMode;
  topic?: string;
}

export interface AIProvider {
  askQuestion(question: string, options?: LegalQueryOptions): Promise<AIResponse>;
}
