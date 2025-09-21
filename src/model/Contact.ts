/**
 * Contact model interface
 * Defines the structure for contact entities in the CRM system
 */
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyId?: string;
  companyName?: string;
  position?: string;
  department?: string;
  address?: Address;
  notes?: string;
  tags?: string[];
  status: 'Active' | 'Inactive' | 'Pending';
  type: 'Customer' | 'Lead' | 'Prospect' | 'Partner';
  assignedToId?: string;
  assignedToName?: string;
  leadScore?: number;
  lastActivityDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  createdByName: string;
}

/**
 * Address interface for contact location information
 */
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

/**
 * Contact creation input interface
 */
export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyId?: string;
  position?: string;
  department?: string;
  address?: Address;
  notes?: string;
  tags?: string[];
  type: Contact['type'];
  assignedToId?: string;
}

/**
 * Contact update input interface
 */
export interface UpdateContactInput extends Partial<CreateContactInput> {
  id: string;
  status?: Contact['status'];
  lastActivityDate?: Date;
  leadScore?: number;
}

/**
 * Contact statistics interface
 */
export interface ContactStats {
  total: number;
  active: number;
  customers: number;
  leads: number;
  prospects: number;
  companies: number;
  recentlyAdded: number;
  highValue: number;
}