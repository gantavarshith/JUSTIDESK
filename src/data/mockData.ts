import { User, Case, Document, RightsCategory, ActivityItem, SituationStep } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya@example.com',
  role: 'citizen',
  avatar: undefined,
};

export const mockCases: Case[] = [
  {
    id: '1',
    title: 'Property Dispute - Residential Plot',
    status: 'active',
    type: 'Property',
    createdAt: '2024-11-15',
    updatedAt: '2024-12-01',
    description: 'Boundary dispute with neighboring property owner.',
  },
  {
    id: '2',
    title: 'Consumer Complaint - Defective Product',
    status: 'pending',
    type: 'Consumer',
    createdAt: '2024-11-28',
    updatedAt: '2024-11-30',
    description: 'Seeking refund for defective electronics.',
  },
  {
    id: '3',
    title: 'Traffic Challan Appeal',
    status: 'resolved',
    type: 'Traffic',
    createdAt: '2024-10-20',
    updatedAt: '2024-11-25',
    description: 'Wrongful parking violation appeal.',
  },
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Rental_Agreement_2024.pdf',
    type: 'Contract',
    analyzedAt: '2024-11-30',
    status: 'analyzed',
    summary: 'Standard 11-month rental agreement with security deposit clause.',
  },
  {
    id: '2',
    name: 'Police_FIR_Copy.pdf',
    type: 'Legal Document',
    analyzedAt: '2024-11-28',
    status: 'analyzed',
    summary: 'FIR filed for theft incident. Contains witness statements.',
  },
  {
    id: '3',
    name: 'Employment_Contract.pdf',
    type: 'Contract',
    analyzedAt: '',
    status: 'pending',
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'case_update',
    title: 'Case Status Updated',
    description: 'Property Dispute case moved to hearing stage.',
    timestamp: '2024-12-01T10:30:00',
    caseId: '1',
  },
  {
    id: '2',
    type: 'document_analysis',
    title: 'Document Analyzed',
    description: 'Rental agreement analysis completed.',
    timestamp: '2024-11-30T15:45:00',
    documentId: '1',
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message from Lawyer',
    description: 'Advocate Singh sent you a message regarding your case.',
    timestamp: '2024-11-30T09:15:00',
    caseId: '1',
  },
  {
    id: '4',
    type: 'system',
    title: 'Welcome to JusticeDesk',
    description: 'Your account has been verified successfully.',
    timestamp: '2024-11-15T08:00:00',
  },
];

export const mockRightsCategories: RightsCategory[] = [
  {
    id: 'police',
    title: 'Police & Traffic',
    icon: 'Shield',
    description: 'Know your rights when dealing with law enforcement',
    rights: [
      {
        id: 'p1',
        title: 'Right to Know the Reason for Arrest',
        explanation: 'Under Article 22(1) of the Constitution, every person who is arrested must be informed of the grounds for their arrest immediately.',
        relatedActs: ['Article 22(1)', 'Section 50 CrPC / Section 47 BNSS'],
        category: 'police',
      },
      {
        id: 'p2',
        title: 'Right to Remain Silent',
        explanation: 'You have the right to not answer questions that may incriminate you. You cannot be compelled to be a witness against yourself.',
        relatedActs: ['Article 20(3)'],
        category: 'police',
      },
      {
        id: 'p3',
        title: 'Right to Legal Representation',
        explanation: 'You have the right to consult and be defended by a legal practitioner of your choice upon arrest.',
        relatedActs: ['Article 22(1)', 'Section 41D CrPC / Section 35(1) BNSS'],
        category: 'police',
      },
      {
        id: 'p4',
        title: 'Right to a Free Copy of the FIR',
        explanation: 'The police must provide a copy of the First Information Report (FIR) to the informant or complainant immediately, free of cost.',
        relatedActs: ['Section 154(2) CrPC / Section 173(2) BNSS'],
        category: 'police',
      },
      {
        id: 'p5',
        title: 'Right of Women against Night Arrest',
        explanation: 'No woman can be arrested after sunset and before sunrise, except under exceptional circumstances by a woman police officer with prior written permission of a Judicial Magistrate.',
        relatedActs: ['Section 46(4) CrPC / Section 43(5) BNSS'],
        category: 'police',
      },
      {
        id: 'p6',
        title: 'Right to Free Legal Aid',
        explanation: 'If you cannot afford a lawyer, the state is obligated to provide free legal representation during trial and court hearings.',
        relatedActs: ['Article 39A', 'Section 304 CrPC / Section 341 BNSS'],
        category: 'police',
      },
      {
        id: 'p7',
        title: 'Right to Medical Examination',
        explanation: 'An arrested person has the right to be examined by a medical practitioner immediately after arrest to document their physical condition and record any injuries.',
        relatedActs: ['Section 54 CrPC / Section 53 BNSS'],
        category: 'police',
      }
    ],
  },
  {
    id: 'property',
    title: 'Property & Rent',
    icon: 'Home',
    description: 'Rights related to property ownership and tenancy',
    rights: [
      {
        id: 'pr1',
        title: 'Protection from Illegal Eviction',
        explanation: 'A landlord cannot forcibly evict you without following due legal process. You must be given proper notice as per local rent control laws.',
        relatedActs: ['Rent Control Acts', 'Section 441 IPC'],
        category: 'property',
      },
      {
        id: 'pr2',
        title: 'Right to Receipt for Rent Payment',
        explanation: 'You have the right to receive a written receipt for every rent payment made, regardless of the payment method (cash, cheque, online).',
        category: 'property',
      },
      {
        id: 'pr3',
        title: 'Right to Essential Services',
        explanation: 'A landlord cannot cut off utilities like electricity, water, or access to common areas to force you out, even if there is a rent dispute.',
        relatedActs: ['Rent Control Acts'],
        category: 'property',
      },
      {
        id: 'pr4',
        title: 'Right to Privacy and Quiet Enjoyment',
        explanation: 'A tenant has the right to peaceful possession. The landlord cannot enter the rented premises without reasonable notice and a valid reason.',
        category: 'property',
      },
      {
        id: 'pr5',
        title: 'Return of Security Deposit',
        explanation: 'Landlords are legally obligated to return the security deposit upon the termination of the lease, deducting only actual repair costs (excluding normal wear and tear).',
        category: 'property',
      },
      {
        id: 'pr6',
        title: 'Equal Property Rights for Daughters',
        explanation: 'Daughters have equal coparcenary rights in ancestral Hindu property by birth, identical to those of sons.',
        relatedActs: ['Hindu Succession (Amendment) Act 2005'],
        category: 'property',
      }
    ],
  },
  {
    id: 'cyber',
    title: 'Cybercrime',
    icon: 'Laptop',
    description: 'Protection against online fraud and harassment',
    rights: [
      {
        id: 'c1',
        title: 'Right to File Cyber Complaint',
        explanation: 'You can file complaints about cybercrime at any police station (Zero FIR) or online through the National Cybercrime Reporting Portal.',
        relatedActs: ['IT Act 2000', 'Section 66'],
        category: 'cyber',
      },
      {
        id: 'c2',
        title: 'Protection of Personal Data',
        explanation: 'Organizations must protect your personal data and cannot share or process it without your explicit consent.',
        relatedActs: ['Digital Personal Data Protection (DPDP) Act 2023', 'IT Act 43A'],
        category: 'cyber',
      },
      {
        id: 'c3',
        title: 'Right to Report Anonymously',
        explanation: 'Victims of online harassment, cyberbullying, or explicit content dissemination can report cases anonymously to preserve their dignity and safety.',
        relatedActs: ['Cybercrime Reporting Guidelines'],
        category: 'cyber',
      },
      {
        id: 'c4',
        title: 'Zero Liability for Fraud Transactions',
        explanation: 'If you notify your bank about an unauthorized online transaction within three working days of occurrence, your liability is zero.',
        relatedActs: ['RBI Circular on Customer Liability'],
        category: 'cyber',
      },
      {
        id: 'c5',
        title: 'Protection Against Identity Theft',
        explanation: 'Using another person\'s password, digital signature, or biometric details fraudulently is a criminal offense with strict penalties.',
        relatedActs: ['IT Act Section 66C'],
        category: 'cyber',
      }
    ],
  },
  {
    id: 'workplace',
    title: 'Workplace',
    icon: 'Briefcase',
    description: 'Employee rights and workplace protections',
    rights: [
      {
        id: 'w1',
        title: 'Protection from Sexual Harassment',
        explanation: 'Every workplace with 10+ employees must maintain an Internal Complaints Committee. You have the right to file complaints in absolute confidentiality.',
        relatedActs: ['POSH Act 2013'],
        category: 'workplace',
      },
      {
        id: 'w2',
        title: 'Right to Fair Wages',
        explanation: 'Employers must pay minimum wages and cannot make arbitrary or unauthorized deductions from your salary.',
        relatedActs: ['Minimum Wages Act', 'Payment of Wages Act'],
        category: 'workplace',
      },
      {
        id: 'w3',
        title: 'Right to Maternity Benefits',
        explanation: 'Female employees are entitled to 26 weeks of fully paid maternity leave and protection against termination during pregnancy.',
        relatedActs: ['Maternity Benefit Amendment Act 2017'],
        category: 'workplace',
      },
      {
        id: 'w4',
        title: 'Equal Pay for Equal Work',
        explanation: 'Employers must pay equal remuneration to male and female workers performing identical or similar tasks.',
        relatedActs: ['Equal Remuneration Act 1976'],
        category: 'workplace',
      },
      {
        id: 'w5',
        title: 'Right to Gratuity',
        explanation: 'Employees who have completed five continuous years of service in an establishment with 10+ workers are entitled to gratuity payments upon exit.',
        relatedActs: ['Payment of Gratuity Act 1972'],
        category: 'workplace',
      },
      {
        id: 'w6',
        title: 'Right to Safe Working Conditions',
        explanation: 'Workers have the right to a clean, safe work environment with adequate ventilation, clean water, and basic hygiene facilities.',
        relatedActs: ['Factories Act 1948', 'Shops & Establishments Act'],
        category: 'workplace',
      }
    ],
  },
  {
    id: 'consumer',
    title: 'Consumer Issues',
    icon: 'ShoppingBag',
    description: 'Consumer protection and redressal rights',
    rights: [
      {
        id: 'co1',
        title: 'Right to Refund or Replacement',
        explanation: 'If a product is defective or a service is deficient, you have the right to seek refund, replacement, or repair from the merchant.',
        relatedActs: ['Consumer Protection Act 2019'],
        category: 'consumer',
      },
      {
        id: 'co2',
        title: 'Right to Information',
        explanation: 'You have the right to be informed about the quality, quantity, potency, purity, standard, and price of goods or services before purchasing.',
        relatedActs: ['Consumer Protection Act 2019', 'Section 2(9)'],
        category: 'consumer',
      },
      {
        id: 'co3',
        title: 'Right to Seek Redressal',
        explanation: 'You have the right to file a dispute in the Consumer Forum against unfair trade practices, misleading advertisements, or consumer exploitation.',
        relatedActs: ['Consumer Protection Act 2019'],
        category: 'consumer',
      },
      {
        id: 'co4',
        title: 'Right to Choice',
        explanation: 'Consumers have the right to access a variety of goods and services at competitive prices, free from monopolistic or coercive seller practices.',
        relatedActs: ['Consumer Protection Act 2019'],
        category: 'consumer',
      },
      {
        id: 'co5',
        title: 'Right to Consumer Education',
        explanation: 'You have the right to acquire the knowledge and skill to be an informed consumer, preventing vendor exploitation and fraud.',
        relatedActs: ['Consumer Protection Act 2019'],
        category: 'consumer',
      },
      {
        id: 'co6',
        title: 'Right to Protection Against Hazardous Goods',
        explanation: 'Consumers have the right to be protected against products, services, or manufacturing processes that are dangerous to health or life.',
        relatedActs: ['Consumer Protection Act 2019'],
        category: 'consumer',
      }
    ],
  },
];

export const situationSteps: SituationStep[] = [
  {
    id: 'start',
    question: 'What situation are you facing right now?',
    options: [
      { id: 's1', label: 'Stopped by police', nextStepId: 'police_stop' },
      { id: 's2', label: 'Asked for a bribe', nextStepId: 'bribe' },
      { id: 's3', label: 'Being threatened', nextStepId: 'threat' },
      { id: 's4', label: 'Vehicle seized', nextStepId: 'vehicle' },
    ],
  },
  {
    id: 'police_stop',
    question: 'Is this a routine check or are you being detained?',
    options: [
      { 
        id: 'ps1', 
        label: 'Routine document check',
        advice: 'Stay calm. You must show your license, registration, and insurance. The officer should identify themselves. You can record the interaction.',
      },
      { 
        id: 'ps2', 
        label: 'Being detained/questioned',
        advice: 'Ask for the reason for detention. You have the right to remain silent. Request to contact a family member or lawyer. Do not sign anything without understanding it.',
      },
    ],
  },
  {
    id: 'bribe',
    question: 'Who is asking for a bribe?',
    options: [
      { 
        id: 'b1', 
        label: 'Police officer',
        advice: 'Do not pay. Note the officer\'s name/badge number. You can file a complaint at the Anti-Corruption Bureau or through the Chief Minister\'s helpline. Record if safe to do so.',
      },
      { 
        id: 'b2', 
        label: 'Government official',
        advice: 'Do not pay. Document the incident. File complaint with Anti-Corruption Bureau (ACB) or Lokayukta. You can also use the Vigilance Commission portal.',
      },
    ],
  },
  {
    id: 'threat',
    question: 'What type of threat?',
    options: [
      { 
        id: 't1', 
        label: 'Physical threat',
        advice: 'Move to safety immediately. Call 100 for police. Document injuries with photos. File an FIR at the nearest police station.',
      },
      { 
        id: 't2', 
        label: 'Online/Cyber threat',
        advice: 'Take screenshots of all threats. Do not delete evidence. Report at cybercrime.gov.in or call 1930. File police complaint with digital evidence.',
      },
    ],
  },
  {
    id: 'vehicle',
    question: 'Why was your vehicle seized?',
    options: [
      { 
        id: 'v1', 
        label: 'Missing documents',
        advice: 'You must be given a receipt for seizure. Collect documents and visit the RTO/Traffic office within 7 days. A fine may apply but your vehicle cannot be held indefinitely.',
      },
      { 
        id: 'v2', 
        label: 'Alleged violation',
        advice: 'Ask for the specific violation. Get the seizure receipt. You can challenge wrongful seizure in court. Contact a lawyer if the seizure seems unjust.',
      },
    ],
  },
];

export const justiceQuotes = [
  "Knowing your rights is the first step toward justice.",
  "Law is for everyone, not just lawyers.",
  "Your rights are your shield.",
  "Justice delayed is justice denied.",
  "An informed citizen is an empowered citizen.",
];
