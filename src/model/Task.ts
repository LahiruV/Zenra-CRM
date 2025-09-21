/**
 * Task model interface
 * Defines the structure for task entities in the CRM system
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Follow-up' | 'Demo' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  dueDate?: Date;
  completedDate?: Date;
  assignedToId: string;
  assignedToName: string;
  createdById: string;
  createdByName: string;
  relatedToType?: 'Contact' | 'Lead' | 'Account' | 'Deal';
  relatedToId?: string;
  relatedToName?: string;
  tags?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  type: Task['type'];
  priority: Task['priority'];
  dueDate?: Date;
  assignedToId: string;
  relatedToType?: Task['relatedToType'];
  relatedToId?: string;
  tags?: string[];
  notes?: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
  status?: Task['status'];
  completedDate?: Date;
}