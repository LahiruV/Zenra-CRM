/**
 * Activity model interface
 * Defines the structure for activity/communication log entities
 */
export interface Activity {
  id: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note' | 'Task' | 'Deal Update' | 'Status Change';
  subject: string;
  description?: string;
  direction?: 'Inbound' | 'Outbound'; // For calls/emails
  duration?: number; // in minutes for calls/meetings
  outcome?: string;
  relatedToType: 'Contact' | 'Lead' | 'Account' | 'Deal' | 'Ticket';
  relatedToId: string;
  relatedToName: string;
  createdById: string;
  createdByName: string;
  createdAt: Date;
  scheduledAt?: Date;
  completedAt?: Date;
  attachments?: string[];
}

export interface CreateActivityInput {
  type: Activity['type'];
  subject: string;
  description?: string;
  direction?: Activity['direction'];
  duration?: number;
  outcome?: string;
  relatedToType: Activity['relatedToType'];
  relatedToId: string;
  scheduledAt?: Date;
  completedAt?: Date;
}