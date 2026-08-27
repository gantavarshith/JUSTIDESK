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
        relatedActs: ['Article 22(1)', 'Section 50 CrPC'],
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
        relatedActs: ['Article 22(1)', 'Section 41D CrPC'],
        category: 'police',
      },
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
        explanation: 'You have the right to receive a written receipt for every rent payment made, regardless of payment method.',
        category: 'property',
      },
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
        explanation: 'You can file complaints about cybercrime at any police station or through the National Cybercrime Reporting Portal.',
        relatedActs: ['IT Act 2000', 'Section 66'],
        category: 'cyber',
      },
      {
        id: 'c2',
        title: 'Protection of Personal Data',
        explanation: 'Organizations must protect your personal data and cannot share it without consent.',
        relatedActs: ['IT Act 2000', 'Section 43A'],
        category: 'cyber',
      },
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
        explanation: 'Every workplace must have an Internal Complaints Committee. You have the right to file complaints without retaliation.',
        relatedActs: ['POSH Act 2013'],
        category: 'workplace',
      },
      {
        id: 'w2',
        title: 'Right to Wages',
        explanation: 'Employers must pay minimum wages and cannot make illegal deductions from your salary.',
        relatedActs: ['Minimum Wages Act', 'Payment of Wages Act'],
        category: 'workplace',
      },
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
        title: 'Right to Refund/Replacement',
        explanation: 'If a product is defective, you have the right to seek refund, replacement, or repair within the warranty period.',
        relatedActs: ['Consumer Protection Act 2019'],
        category: 'consumer',
      },
      {
        id: 'co2',
        title: 'Right to Information',
        explanation: 'You have the right to be informed about the quality, quantity, potency, purity, and price of goods or services.',
        relatedActs: ['Consumer Protection Act 2019', 'Section 2(9)'],
        category: 'consumer',
      },
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
