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
  status: 'Hot' | 'Warm' | 'Cold' | 'Qualified' | 'Converted' | 'Lost';
  source: string;
  estimatedValue: number;
  assignedTo?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
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
  notes?: string;
}

/**
 * Lead update input interface
 */
export interface UpdateLeadInput extends Partial<CreateLeadInput> {
  id: string;
  status?: Lead['status'];
  assignedTo?: string;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
}

/**
 * Lead statistics interface
 */
export interface LeadStats {
  total: number;
  hot: number;
  warm: number;
  cold: number;
  converted: number;
  conversionRate: number;
}