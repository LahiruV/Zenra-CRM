/**
 * Event model interface for calendar scheduling
 * Defines the structure for calendar events and task scheduling
 */
export interface Event {
  id: string;
  title: string;
  description?: string;
  type: 'Meeting' | 'Call' | 'Task' | 'Reminder' | 'Follow-up' | 'Demo' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'Rescheduled';
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  location?: string;
  attendees?: string[];
  relatedToType?: 'Contact' | 'Lead' | 'Account' | 'Deal' | 'Ticket';
  relatedToId?: string;
  relatedToName?: string;
  assignedToId: string;
  assignedToName: string;
  createdById: string;
  createdByName: string;
  reminder?: number; // minutes before event
  recurring?: 'None' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  tags?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventInput {
  title: string;
  description?: string;
  type: Event['type'];
  priority: Event['priority'];
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  location?: string;
  attendees?: string[];
  relatedToType?: Event['relatedToType'];
  relatedToId?: string;
  assignedToId: string;
  reminder?: number;
  recurring?: Event['recurring'];
  tags?: string[];
  notes?: string;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: string;
  status?: Event['status'];
}