import { AIProvider, AIResponse, LegalQueryOptions } from '../types';
import { aiConfig } from '@/config/aiConfig';
import { getPromptForMode } from '../promptTemplates';
import { formatLegalResponse } from '../responseFormatter';

export const openaiProvider: AIProvider = {
  async askQuestion(question: string, options?: LegalQueryOptions): Promise<AIResponse> {
    try {
      const config = aiConfig.openai;
      if (!config.apiKey) {
        return { success: false, error: 'OpenAI API key is not configured.' };
      }

      const promptText = getPromptForMode(options?.mode, question);

      const response = await fetch(`${config.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          messages: [
            {
              role: 'system',
              content: promptText,
            },
            {
              role: 'user',
              content: question,
            },
          ],
          temperature: 0.6,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error?.message || `OpenAI API error (${response.status})`,
        };
      }

      const data = await response.json();
      const rawMessage = data.choices?.[0]?.message?.content || '';
      
      const formatted = formatLegalResponse(rawMessage);
      return {
        success: true,
        data: formatted,
      };
    } catch (err) {
      return {
        success: false,
        error: `OpenAI API call failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      };
    }
  },
};
