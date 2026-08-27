import { AIProvider, AIResponse, LegalQueryOptions } from '../types';
import { formatLegalResponse } from '../responseFormatter';

/**
 * Rich Mock Provider with humanized conversational legal counsel responses.
 */
export const mockProvider: AIProvider = {
  async askQuestion(question: string, options?: LegalQueryOptions): Promise<AIResponse> {
    // Artificial small delay for realistic interaction
    await new Promise((resolve) => setTimeout(resolve, 600));

    const q = question.toLowerCase();

    if (q.includes('fundamental right') || q.includes('constitution') || q.includes('article')) {
      const response = formatLegalResponse(
        `Under Part III of the Constitution of India (Articles 12 to 35), fundamental rights are guaranteed to every citizen to protect dignity and personal freedom against arbitrary state action.

The core pillars include:
• Right to Equality (Articles 14-18): Ensures equal treatment before the law and prohibits discrimination based on religion, caste, sex, or birthplace.
• Right to Freedom (Articles 19-22): Protects freedom of speech, peaceful assembly, movement across India, trade, and personal liberty under Article 21.
• Right Against Exploitation (Articles 23-24): Bans forced labor, human trafficking, and hazardous employment of children under 14.
• Right to Constitutional Remedies (Article 32): Empowers you to directly approach the Supreme Court via writ petitions (Habeas Corpus, Mandamus, etc.) if your rights are infringed.

If your fundamental rights are violated by a state entity or local authority, you have the right to seek immediate judicial intervention.`,
        [
          "How do I file a Writ Petition under Article 226 in the High Court?",
          "What is the difference between Article 32 and Article 226?",
          "What constitutes a violation of Article 21 (Right to Life & Liberty)?"
        ]
      );
      return { success: true, data: response };
    }

    if (q.includes('employ') || q.includes('workplace') || q.includes('salary') || q.includes('wage') || q.includes('terminat')) {
      const response = formatLegalResponse(
        `Workplace laws in India safeguard employees against illegal termination, unpaid dues, and unsafe working conditions.

Key protections available to you:
• Payment of Wages Act, 1936 & Industrial Disputes Act, 1947: Require employers to disburse earned wages without unauthorized deductions and provide mandatory notice or severance pay prior to retrenchment.
• Prevention of Sexual Harassment (POSH) Act, 2013: Every workplace with 10+ employees must maintain an Internal Complaints Committee (ICC) to address harassment grievances confidentially within 90 days.
• Maternity Benefit Act, 1961: Entitles eligible female employees to 26 weeks of paid maternity leave and protection against dismissal during leave.

If you are facing unpaid wages or wrongful termination:
1. Preserve all official appointment letters, pay slips, and email communications.
2. Send a formal legal notice demanding payment within 15 days.
3. If unresolved, approach the Deputy Labor Commissioner in your jurisdiction or file a claim before the Labor Forum.`,
        [
          "How do I send a legal notice for non-payment of salary?",
          "What constitutes wrongful termination under Indian Labor Law?",
          "How do I file a complaint with the Internal Complaints Committee (ICC)?"
        ]
      );
      return { success: true, data: response };
    }

    if (q.includes('property') || q.includes('tenant') || q.includes('landlord') || q.includes('rent') || q.includes('evict')) {
      const response = formatLegalResponse(
        `Property and tenancy matters are governed by state-specific Rent Control Acts and the Transfer of Property Act, 1882.

Important protections for tenants and property owners:
• Protection Against Arbitrary Eviction: A landlord cannot forcibly lock out a tenant or disconnect utilities (water, electricity). Eviction requires valid grounds under the agreement and due judicial notice.
• Security Deposit Return: Deposits must be refunded upon tenancy expiration, minus agreed-upon damages documented with receipts.
• Title & Transfer Rights: Property sales require registered deeds under the Registration Act, 1908 to grant valid legal ownership.

Recommended action path:
1. Review your written Leave and License or Tenancy Agreement for clause compliance.
2. Communicate grievances in writing (Email/Registered AD Post) to maintain a verifiable paper trail.
3. For landlord-tenant disputes, file a petition with the Rent Control Authority or Rent Tribunal.`,
        [
          "What should I do if my landlord illegally cuts off electricity?",
          "How can I recover my unrefunded security deposit?",
          "What documents are required to verify clear property title before purchase?"
        ]
      );
      return { success: true, data: response };
    }

    if (q.includes('consumer') || q.includes('defective') || q.includes('refund') || q.includes('fraud')) {
      const response = formatLegalResponse(
        `Under the Consumer Protection Act, 2019, consumers have strong legal remedies against defective products, deficient services, unfair trade practices, and misleading advertisements.

Your statutory rights include:
• Right to Refund or Replacement: Sellers and e-commerce platforms must rectify defective goods or provide full monetary compensation.
• Right to Compensation: You can claim damages for financial loss, bodily harm, or mental agony caused by negligent service providers.
• Simplifies E-Filing: You can file grievances online via the official e-Daakhil portal (edaakhil.nic.in) without needing an expensive advocate.

Steps to seek redressal:
1. Issue a formal written complaint / legal notice to the vendor's customer grievance officer giving 15 days to resolve.
2. Keep invoices, order numbers, warranty cards, and chat logs preserved.
3. Lodge your claim with the District Consumer Disputes Redressal Commission if unresolved.`,
        [
          "How do I register a complaint on the national e-Daakhil portal?",
          "Can I claim compensation for mental agony from an e-commerce company?",
          "What is the time limit for filing a consumer forum complaint?"
        ]
      );
      return { success: true, data: response };
    }

    if (q.includes('police') || q.includes('arrest') || q.includes('bail') || q.includes('fir') || q.includes('custody')) {
      const response = formatLegalResponse(
        `If you or someone you know is called by the police or arrested, Indian criminal law (BNSS 2023 / CrPC) provides strict safeguards to protect personal liberty:

Your constitutional rights during police procedures:
• Right to Know Grounds of Arrest (Section 50 CrPC / BNSS Equivalent): Police must inform you immediately of the specific charges and whether the offense is bailable.
• Right to Legal Counsel & Silence (Article 22(1)): You have the absolute right to consult an advocate of your choice and remain silent during questioning.
• Production Before Magistrate Within 24 Hours (Article 22(2)): Detention beyond 24 hours without a magistrate's judicial remand order is illegal.
• Right Against Force/Torture: Medical examination must be conducted upon arrest to record physical condition.

Immediate action steps:
1. Request the arrest memo clearly stating the time, location, and officer details.
2. Inform a family member or legal representative immediately.
3. Apply for regular bail or anticipatory bail before the Magistrate or Sessions Court.`,
        [
          "What is Anticipatory Bail and how can I apply for it?",
          "What should I do if the police refuse to register an FIR?",
          "What are my rights during police interrogation?"
        ]
      );
      return { success: true, data: response };
    }

    // Default natural human legal response
    const defaultResponse = formatLegalResponse(
      `Navigating legal queries requires understanding the specific facts and applicable statutes under Indian law.

Whether your question relates to civil rights, workplace regulations, commercial contracts, family disputes, or criminal procedures, the legal framework prioritizes fair procedure and documentary evidence.

To give you exact guidance tailored to your situation:
1. Share the core facts or specific dispute you are facing.
2. Mention any relevant agreements, notices, or dates involved.
3. Indicate what specific outcome or remedy you are hoping to achieve.

Feel free to pick one of the suggested topics below or describe your situation in detail.`,
      [
        "What are my fundamental rights under the Constitution?",
        "What are my rights as a consumer for defective goods?",
        "What steps should I take if I face wrongful termination?"
      ]
    );

    return { success: true, data: defaultResponse };
  },
};
