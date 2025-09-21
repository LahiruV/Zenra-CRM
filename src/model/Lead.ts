/**
 * Lead model interface
 * Defines the structure for lead entities in the CRM system
 */
export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  source: string;
  estimatedValue: number;
  assignedToId?: string;
  assignedToName?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  expectedCloseDate?: Date;
  lastActivityDate?: Date;
  nextFollowUpDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  createdByName: string;
  tags?: string[];
  companyId?: string;
  contactId?: string;
}

/**
 * Lead creation input interface
 */
export interface CreateLeadInput {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  source: string;
  estimatedValue: number;
  priority: Lead['priority'];
  expectedCloseDate?: Date;
  assignedToId?: string;
  notes?: string;
  tags?: string[];
}

/**
 * Lead update input interface
 */
export interface UpdateLeadInput extends Partial<CreateLeadInput> {
  id: string;
  status?: Lead['status'];
  assignedToId?: string;
  lastActivityDate?: Date;
  nextFollowUpDate?: Date;
}

/**
 * Lead pipeline stage interface
 */
export interface LeadPipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
  description?: string;
}

/**
 * User interface for assignments
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

/**
 * Lead statistics interface
 */
export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  proposal: number;
  negotiation: number;
  closedWon: number;
  closedLost: number;
  conversionRate: number;
  averageDealSize: number;
  totalValue: number;
}