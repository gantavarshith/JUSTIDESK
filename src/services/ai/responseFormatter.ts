import { StructuredLegalResponse, LegalActReference } from './types';

/**
 * Response Formatter Module
 * Transforms raw text outputs into clean, humanized legal assistance responses.
 * Strips out repetitive AI boilerplate and parses acts/action steps.
 */

export function formatLegalResponse(rawText: string, defaultFollowUps: string[] = []): StructuredLegalResponse {
  if (!rawText) {
    return {
      narrative: "I'm here to help with your legal query. Could you provide a bit more context about your situation?",
      followUp: defaultFollowUps,
    };
  }

  // 1. Clean up AI intro boilerplate
  let cleanedText = rawText
    .replace(/^(Certainly!|Sure!|Hello!|As an AI language model|As an AI legal assistant)[^\n]*\n+/gi, '')
    .replace(/^(Here is a (comprehensive |detailed )?(breakdown|explanation|summary)[^\n]*\n+)/gi, '')
    .trim();

  // 2. Extract potential Legal Acts / Sections using regex heuristic
  const acts: LegalActReference[] = [];
  const actRegex = /(?:Article\s+\d+|Section\s+\d+|[A-Z][a-zA-B\s]+Act(?:,\s+\d{4})?)/g;
  const matches = cleanedText.match(actRegex) || [];
  
  const uniqueMatches = Array.from(new Set(matches));
  uniqueMatches.forEach((match) => {
    if (match.length > 5 && !['Section 1', 'Section 2'].includes(match)) {
      acts.push({
        act: match,
        description: 'Relevant legal provision cited in guidance',
      });
    }
  });

  // 3. Extract action steps if present as numbered/bulleted steps
  const actionSteps: string[] = [];
  const lines = cleanedText.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (/^(\d+\.|\*|-)\s+(File|Submit|Draft|Send|Contact|Preserve|Gather|Approach|Keep|Consult)/i.test(trimmed)) {
      actionSteps.push(trimmed.replace(/^(\d+\.|\*|-)\s+/, ''));
    }
  });

  // 4. Generate dynamic follow up questions based on content if not provided
  let followUp = defaultFollowUps;
  if (!followUp || followUp.length === 0) {
    followUp = generateDynamicFollowUps(cleanedText);
  }

  return {
    narrative: cleanedText,
    relevantActs: acts.slice(0, 4),
    actionSteps: actionSteps.length > 0 ? actionSteps.slice(0, 5) : undefined,
    followUp: followUp.slice(0, 3),
    disclaimer: 'This information is for educational and guidance purposes under Indian law and does not constitute formal attorney-client advice.'
  };
}

function generateDynamicFollowUps(text: string): string[] {
  const lower = text.toLowerCase();
  const questions: string[] = [];

  if (lower.includes('workplace') || lower.includes('salary') || lower.includes('employ')) {
    questions.push("What should I do if my employer threatens termination?");
    questions.push("How do I approach the Labor Commissioner?");
    questions.push("What documentation should I gather for proof?");
  } else if (lower.includes('tenant') || lower.includes('landlord') || lower.includes('rent')) {
    questions.push("How much notice is legally required before eviction?");
    questions.push("What if the landlord refuses to return my security deposit?");
    questions.push("Where can I file a complaint against rent harassment?");
  } else if (lower.includes('consumer') || lower.includes('product') || lower.includes('refund')) {
    questions.push("How do I file a case on the e-Daakhil portal?");
    questions.push("Am I entitled to compensation for mental agony?");
    questions.push("What is the deadline for filing a consumer claim?");
  } else {
    questions.push("What are the next practical steps I should take?");
    questions.push("Which documents are required for this legal process?");
    questions.push("How can I find a legal aid attorney for this case?");
  }

  return questions;
}
