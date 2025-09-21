/**
 * Deal/Opportunity model interface
 * Defines the structure for deal entities in the CRM system
 */
export interface Deal {
  id: string;
  name: string;
  description?: string;
  value: number;
  currency: string;
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number; // 0-100
  expectedCloseDate?: Date;
  actualCloseDate?: Date;
  source: string;
  accountId?: string;
  accountName?: string;
  contactId?: string;
  contactName?: string;
  ownerId: string;
  ownerName: string;
  tags?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivityDate?: Date;
}

export interface CreateDealInput {
  name: string;
  description?: string;
  value: number;
  currency: string;
  stage: Deal['stage'];
  probability: number;
  expectedCloseDate?: Date;
  source: string;
  accountId?: string;
  contactId?: string;
  ownerId: string;
  tags?: string[];
  notes?: string;
}

export interface UpdateDealInput extends Partial<CreateDealInput> {
  id: string;
  actualCloseDate?: Date;
  lastActivityDate?: Date;
}

export interface DealStats {
  total: number;
  totalValue: number;
  won: number;
  wonValue: number;
  lost: number;
  lostValue: number;
  pipeline: number;
  pipelineValue: number;
  winRate: number;
  averageDealSize: number;
}