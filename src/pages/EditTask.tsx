import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Clock, Phone, Mail, Calendar, User, Save, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, Input, TextArea, Select } from '../widgets';

interface TaskFormData {
  title: string;
  description: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Follow-up' | 'Demo' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  dueDate: string;
  assignedTo: string;
  relatedTo: string;
  relatedType: 'Contact' | 'Lead' | 'Account' | 'Deal';
  notes: string;
}

// Mock task data
const mockTasks = [
  {
    id: '1',
    title: 'Follow up with Acme Corp',
    description: 'Discuss pricing for enterprise package',
    type: 'Call' as const,
    priority: 'High' as const,
    status: 'Pending' as const,
    dueDate: '2024-01-20',
    assignedTo: 'John Smith',
    relatedTo: 'Acme Corporation',
    relatedType: 'Account' as const,
    notes: 'Interested in enterprise package'
  },
  {
    id: '2',
    title: 'Send proposal to Tech Solutions',
    description: 'Send detailed proposal for software integration',
    type: 'Email' as const,
    priority: 'Medium' as const,
    status: 'In Progress' as const,
    dueDate: '2024-01-18',
    assignedTo: 'Sarah Johnson',
    relatedTo: 'Tech Solutions Inc',
    relatedType: 'Lead' as const,
    notes: 'Proposal ready for review'
  }
];

/**
 * Edit Task page
 */
const EditTask: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    type: 'Call',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
    assignedTo: '',
    relatedTo: '',
    relatedType: 'Contact',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [taskTitle, setTaskTitle] = useState('');

  const typeOptions = [
    { label: 'Call', value: 'Call' },
    { label: 'Email', value: 'Email' },
    { label: 'Meeting', value: 'Meeting' },
    { label: 'Follow-up', value: 'Follow-up' },
    { label: 'Demo', value: 'Demo' },
    { label: 'Other', value: 'Other' }
  ];

  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' }
  ];

  const statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  const relatedTypeOptions = [
    { label: 'Contact', value: 'Contact' },
    { label: 'Lead', value: 'Lead' },
    { label: 'Account', value: 'Account' },
    { label: 'Deal', value: 'Deal' }
  ];

  // Load task data
  useEffect(() => {
    const loadTask = async () => {
      if (!id) {
        navigate('/tasks');
        return;
      }

      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const task = mockTasks.find(t => t.id === id);
        
        if (!task) {
          toast.error('Task not found');
          navigate('/tasks');
          return;
        }

        setTaskTitle(task.title);
        setFormData({
          title: task.title,
          description: task.description,
          type: task.type,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
          assignedTo: task.assignedTo,
          relatedTo: task.relatedTo,
          relatedType: task.relatedType,
          notes: task.notes
        });
        
      } catch (error) {
        console.error('Error loading task:', error);
        toast.error('Failed to load task');
        navigate('/tasks');
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [id, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned to is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFieldError = (fieldPath: string): string | undefined => {
    return errors[fieldPath];
  };

  const handleInputChange = (field: keyof TaskFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    const fieldPath = field.toString();
    if (errors[fieldPath]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldPath];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Task updated successfully!', {
        description: `${formData.title} has been updated.`,
        action: {
          label: 'View Tasks',
          onClick: () => navigate('/tasks'),
        },
      });
      
      navigate('/tasks');
      
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loading Task...</h1>
            <p className="text-gray-600">Please wait while we load the task information</p>
          </div>
          <Button variant="outline" onClick={handleCancel}>
            Back to Tasks
          </Button>
        </div>
        
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Loading task details...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>
          <p className="text-gray-600">Update "{taskTitle}" information</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Back to Tasks
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card title="Task Information" subtitle="Update the task details">
          <div className="space-y-6">
            <Input
              label="Task Title *"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={getFieldError('title')}
              placeholder="Enter task title"
              fullWidth
            />
            
            <TextArea
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              error={getFieldError('description')}
              placeholder="Enter task description"
              rows={3}
              fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Task Type *"
                options={typeOptions}
                value={formData.type}
                onChange={(value) => handleInputChange('type', value as TaskFormData['type'])}
                error={getFieldError('type')}
                fullWidth
              />
              <Select
                label="Priority *"
                options={priorityOptions}
                value={formData.priority}
                onChange={(value) => handleInputChange('priority', value as TaskFormData['priority'])}
                error={getFieldError('priority')}
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Status *"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value as TaskFormData['status'])}
                error={getFieldError('status')}
                fullWidth
              />
              <Input
                label="Due Date *"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                error={getFieldError('dueDate')}
                leftIcon={<Calendar className="w-4 h-4" />}
                fullWidth
              />
            </div>
          </div>
        </Card>

        {/* Assignment & Related Information */}
        <Card title="Assignment & Related Information" subtitle="Task assignment and related entities">
          <div className="space-y-6">
            <Input
              label="Assigned To *"
              value={formData.assignedTo}
              onChange={(e) => handleInputChange('assignedTo', e.target.value)}
              error={getFieldError('assignedTo')}
              placeholder="Enter assignee name"
              leftIcon={<User className="w-4 h-4" />}
              fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Related To Type"
                options={relatedTypeOptions}
                value={formData.relatedType}
                onChange={(value) => handleInputChange('relatedType', value as TaskFormData['relatedType'])}
                error={getFieldError('relatedType')}
                fullWidth
              />
              <Input
                label="Related To"
                value={formData.relatedTo}
                onChange={(e) => handleInputChange('relatedTo', e.target.value)}
                error={getFieldError('relatedTo')}
                placeholder="Enter related entity name"
                fullWidth
              />
            </div>
          </div>
        </Card>

        {/* Additional Information */}
        <Card title="Additional Information" subtitle="Notes and other details">
          <TextArea
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            error={getFieldError('notes')}
            placeholder="Add any additional notes about this task..."
            rows={4}
            fullWidth
          />
        </Card>

        {/* Form Actions */}
        <Card>
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Updating...' : 'Update Task'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditTask;