/**
 * Account/Company model interface
 * Defines the structure for company/account entities in the CRM system
 */
export interface Account {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: Address;
  employees?: number;
  revenue?: number;
  type: 'Prospect' | 'Customer' | 'Partner' | 'Competitor';
  status: 'Active' | 'Inactive' | 'Pending';
  ownerId?: string;
  ownerName?: string;
  tags?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivityDate?: Date;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface CreateAccountInput {
  name: string;
  industry?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: Address;
  employees?: number;
  revenue?: number;
  type: Account['type'];
  tags?: string[];
  notes?: string;
}

export interface UpdateAccountInput extends Partial<CreateAccountInput> {
  id: string;
  status?: Account['status'];
  ownerId?: string;
  lastActivityDate?: Date;
}