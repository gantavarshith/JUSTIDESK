/**
 * Gemini Service
 * Uses direct REST API with ?key= param (standard AI Studio key format AIzaSy...)
 * Falls back through available models automatically
 */

import { GEMINI_API_KEY, GEMINI_MODEL, LEGAL_SYSTEM_PROMPT } from '@/config/aiConfig';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Fallback model list — confirmed available for this API key
const FALLBACK_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.7-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-lite-latest',
];

async function callGemini(
  model: string,
  apiKey: string,
  contents: object[],
): Promise<{ ok: boolean; text?: string; status?: number; error?: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: {
      parts: [{ text: LEGAL_SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, status: res.status, error: data?.error?.message || `HTTP ${res.status}` };
    }

    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text.trim()) {
      return { ok: false, error: 'Empty response from model.' };
    }

    return { ok: true, text: text.trim() };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Network error.' };
  }
}

export async function sendLegalQuery(
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 10) {
    throw new Error(
      'VITE_GEMINI_API_KEY is not configured. Add it to your .env file and restart the dev server.'
    );
  }

  // Build the conversation contents array
  const contents = [
    ...history.map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }],
    },
  ];

  // Try primary model first, then fallbacks
  const modelsToTry = [GEMINI_MODEL, ...FALLBACK_MODELS.filter((m) => m !== GEMINI_MODEL)];
  const errors: string[] = [];

  for (const model of modelsToTry) {
    const result = await callGemini(model, GEMINI_API_KEY, contents);
    if (result.ok && result.text) {
      return result.text;
    }
    errors.push(`${model}: ${result.error}`);
    // Don't try further if it's a authorization error or similar bad request (e.g. status 400 or 403)
    if (result.status === 400 || result.status === 403) break;
  }

  throw new Error(
    `All models failed. Errors:\n${errors.join('\n')}`
  );
}
