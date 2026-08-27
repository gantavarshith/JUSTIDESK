import { AIProvider, AIResponse, LegalQueryOptions } from '../types';
import { aiConfig } from '@/config/aiConfig';
import { getPromptForMode } from '../promptTemplates';
import { formatLegalResponse } from '../responseFormatter';

export const anthropicProvider: AIProvider = {
  async askQuestion(question: string, options?: LegalQueryOptions): Promise<AIResponse> {
    try {
      const config = aiConfig.anthropic;
      if (!config.apiKey) {
        return { success: false, error: 'Anthropic API key is not configured.' };
      }

      const promptText = getPromptForMode(options?.mode, question);

      const response = await fetch(`${config.endpoint}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: config.model,
          max_tokens: 1000,
          system: promptText,
          messages: [
            {
              role: 'user',
              content: question,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error?.message || `Anthropic API error (${response.status})`,
        };
      }

      const data = await response.json();
      const rawMessage = data.content?.[0]?.text || '';
      
      const formatted = formatLegalResponse(rawMessage);
      return {
        success: true,
        data: formatted,
      };
    } catch (err) {
      return {
        success: false,
        error: `Anthropic API call failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      };
    }
  },
};
