import { AIProvider, AIResponse, LegalQueryOptions } from '../types';
import { aiConfig } from '@/config/aiConfig';
import { getPromptForMode } from '../promptTemplates';
import { formatLegalResponse } from '../responseFormatter';

export const geminiProvider: AIProvider = {
  async askQuestion(question: string, options?: LegalQueryOptions): Promise<AIResponse> {
    try {
      const config = aiConfig.gemini;
      if (!config.apiKey) {
        return { success: false, error: 'Gemini API key is not configured.' };
      }

      const promptText = getPromptForMode(options?.mode, question);

      const response = await fetch(
        `${config.endpoint}/${config.model}:generateContent?key=${config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptText,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 1000,
              temperature: 0.6,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error?.message || `Gemini API error (${response.status})`,
        };
      }

      const data = await response.json();
      const rawMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      const formatted = formatLegalResponse(rawMessage);
      return {
        success: true,
        data: formatted,
      };
    } catch (err) {
      return {
        success: false,
        error: `Gemini API call failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      };
    }
  },
};
