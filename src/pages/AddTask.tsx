import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Phone, Mail, Calendar, User, Save, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, Input, TextArea, Select } from '../widgets';

interface TaskFormData {
  title: string;
  description: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Follow-up' | 'Demo' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate: string;
  assignedTo: string;
  relatedTo: string;
  relatedType: 'Contact' | 'Lead' | 'Account' | 'Deal';
  notes: string;
}

/**
 * Add Task page
 */
const AddTask: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    type: 'Call',
    priority: 'Medium',
    dueDate: '',
    assignedTo: '',
    relatedTo: '',
    relatedType: 'Contact',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const relatedTypeOptions = [
    { label: 'Contact', value: 'Contact' },
    { label: 'Lead', value: 'Lead' },
    { label: 'Account', value: 'Account' },
    { label: 'Deal', value: 'Deal' }
  ];

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
      
      toast.success('Task created successfully!', {
        description: `${formData.title} has been added to your tasks.`,
        action: {
          label: 'View Tasks',
          onClick: () => navigate('/tasks'),
        },
      });
      
      navigate('/tasks');
      
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Task</h1>
          <p className="text-gray-600">Create a new task in your CRM system</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Back to Tasks
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card title="Task Information" subtitle="Enter the task details">
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
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default AddTask;