/**
 * Support Ticket model interface
 * Defines the structure for support ticket entities in the CRM system
 */
export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Pending Customer' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  type: 'Bug' | 'Feature Request' | 'Question' | 'Technical Issue' | 'Other';
  source: 'Email' | 'Phone' | 'Chat' | 'Web Form' | 'Social Media';
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  assignedToId?: string;
  assignedToName?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  firstResponseAt?: Date;
  slaBreached?: boolean;
  responseTime?: number; // in minutes
  resolutionTime?: number; // in minutes
}

export interface TicketComment {
  id: string;
  ticketId: string;
  content: string;
  isInternal: boolean;
  authorId: string;
  authorName: string;
  createdAt: Date;
  attachments?: string[];
}

export interface CreateTicketInput {
  subject: string;
  description: string;
  priority: Ticket['priority'];
  type: Ticket['type'];
  source: Ticket['source'];
  customerId?: string;
  customerEmail?: string;
  assignedToId?: string;
  tags?: string[];
}

export interface UpdateTicketInput extends Partial<CreateTicketInput> {
  id: string;
  status?: Ticket['status'];
  resolvedAt?: Date;
  closedAt?: Date;
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  averageResponseTime: number;
  averageResolutionTime: number;
  slaBreached: number;
}