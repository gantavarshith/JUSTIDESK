/**
 * AI API Configuration
 * Centralizes API setup and model selection
 */

export const aiConfig = {
  // API Service Selection
  service: (import.meta.env.VITE_AI_SERVICE || 'openai') as 'openai' | 'anthropic' | 'gemini' | 'mock',
  
  // OpenAI Configuration
  openai: {
    apiKey: import.meta.env.VITE_AI_API_KEY || '',
    endpoint: import.meta.env.VITE_AI_API_ENDPOINT || 'https://api.openai.com/v1',
    model: import.meta.env.VITE_AI_MODEL || 'gpt-3.5-turbo',
  },

  // Anthropic Configuration (Claude)
  anthropic: {
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
    endpoint: 'https://api.anthropic.com/v1',
    model: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
  },

  // Google Gemini Configuration
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-pro',
  },

  // System prompt for legal context
  systemPrompt: `You are an AI Legal Assistant specializing in Indian law. You provide accurate, helpful information about constitutional rights, employment law, consumer rights, property law, criminal procedures, and other legal matters.

Key guidelines:
- Provide accurate information about Indian laws and constitutional provisions
- Always recommend consulting qualified lawyers for complex legal matters
- Be empathetic and clear in explanations
- Reference relevant articles, sections, or acts when applicable
- Avoid providing legal advice; focus on education and information

Current context: You are assisting citizens of India with legal knowledge.`,

  // Check if API is properly configured
  isConfigured: (): boolean => {
    const apiKey = aiConfig[aiConfig.service]?.apiKey;
    return !!apiKey && apiKey.length > 0;
  },

  // Fallback to mock service
  useMockService: (): boolean => {
    return !aiConfig.isConfigured();
  },
};

// Validation
export const validateAIConfig = (): { valid: boolean; error?: string } => {
  if (aiConfig.service === 'mock') {
    return { valid: true }; // Mock service always works
  }

  const config = aiConfig[aiConfig.service];
  if (!config) {
    return { valid: false, error: `Unknown AI service: ${aiConfig.service}` };
  }

  if (!config.apiKey) {
    return {
      valid: false,
      error: `API key not configured for ${aiConfig.service}. Add VITE_AI_API_KEY to .env.local`,
    };
  }

  return { valid: true };
};
