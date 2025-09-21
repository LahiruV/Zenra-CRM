import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Mail, Phone, Building, DollarSign, Save, User, Calendar, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, Input, TextArea, Select } from '../widgets';
import { leadSchema, type LeadFormData } from '../schemas/contactSchema';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Add Lead page with comprehensive form
 */
const AddLead: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<LeadFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    source: '',
    estimatedValue: 0,
    priority: 'Medium',
    expectedCloseDate: '',
    assignedToId: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock users for assignment
  const [users] = useState<User[]>([
    { id: '1', name: 'Alice Johnson', email: 'alice@company.com', role: 'Sales Manager' },
    { id: '2', name: 'Bob Williams', email: 'bob@company.com', role: 'Sales Rep' },
    { id: '3', name: 'Carol Davis', email: 'carol@company.com', role: 'Account Manager' },
    { id: '4', name: 'David Chen', email: 'david@company.com', role: 'Sales Rep' },
  ]);

  const sourceOptions = [
    { label: 'Website', value: 'Website' },
    { label: 'Referral', value: 'Referral' },
    { label: 'Social Media', value: 'Social Media' },
    { label: 'Email Campaign', value: 'Email Campaign' },
    { label: 'Cold Call', value: 'Cold Call' },
    { label: 'Trade Show', value: 'Trade Show' },
    { label: 'Advertisement', value: 'Advertisement' },
    { label: 'Other', value: 'Other' }
  ];

  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' }
  ];

  const userOptions = users.map(user => ({
    label: `${user.name} (${user.role})`,
    value: user.id
  }));

  const validateForm = (): boolean => {
    try {
      leadSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      
      if (error.errors) {
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
      }
      
      setErrors(newErrors);
      toast.error('Please fix the form errors before submitting');
      return false;
    }
  };

  const getFieldError = (fieldPath: string): string | undefined => {
    return errors[fieldPath];
  };

  const handleInputChange = (field: keyof LeadFormData, value: any) => {
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
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Lead added successfully!', {
        description: `${formData.companyName} has been added to your leads.`,
        action: {
          label: 'View Leads',
          onClick: () => navigate('/leads'),
        },
      });
      
      navigate('/leads');
      
    } catch (error) {
      console.error('Error saving lead:', error);
      toast.error('Failed to add lead', {
        description: 'Please try again or contact support if the problem persists.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/leads');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Lead</h1>
          <p className="text-gray-600">Create a new lead in your CRM system</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Back to Leads
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <Card title="Company Information" subtitle="Enter the lead's company details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Company Name *"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              error={getFieldError('companyName')}
              placeholder="Acme Corporation"
              leftIcon={<Building className="w-4 h-4" />}
              fullWidth
            />
            <Input
              label="Contact Name *"
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              error={getFieldError('contactName')}
              placeholder="John Doe"
              fullWidth
            />
          </div>
        </Card>

        {/* Contact Information */}
        <Card title="Contact Information" subtitle="How to reach this lead">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address *"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={getFieldError('email')}
              placeholder="john.doe@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
              fullWidth
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={getFieldError('phone')}
              placeholder="+1 (555) 123-4567"
              leftIcon={<Phone className="w-4 h-4" />}
              fullWidth
            />
          </div>
        </Card>

        {/* Lead Details */}
        <Card title="Lead Details" subtitle="Lead qualification, priority, and value information">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Lead Source *"
                options={sourceOptions}
                value={formData.source}
                onChange={(value) => handleInputChange('source', value)}
                error={getFieldError('source')}
                placeholder="Select lead source"
                fullWidth
              />
              <Select
                label="Priority *"
                options={priorityOptions}
                value={formData.priority}
                onChange={(value) => handleInputChange('priority', value as LeadFormData['priority'])}
                error={getFieldError('priority')}
                fullWidth
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Estimated Value *"
                type="number"
                value={formData.estimatedValue}
                onChange={(e) => handleInputChange('estimatedValue', parseFloat(e.target.value) || 0)}
                error={getFieldError('estimatedValue')}
                placeholder="50000"
                leftIcon={<DollarSign className="w-4 h-4" />}
                fullWidth
              />
              <Input
                label="Expected Close Date"
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => handleInputChange('expectedCloseDate', e.target.value)}
                error={getFieldError('expectedCloseDate')}
                leftIcon={<Calendar className="w-4 h-4" />}
                fullWidth
              />
            </div>
          </div>
        </Card>

        {/* Assignment */}
        <Card title="Assignment" subtitle="Assign this lead to a team member">
          <Select
            label="Assign To"
            options={userOptions}
            value={formData.assignedToId}
            onChange={(value) => handleInputChange('assignedToId', value)}
            error={getFieldError('assignedToId')}
            placeholder="Select team member"
            fullWidth
          />
        </Card>

        {/* Additional Information */}
        <Card title="Additional Information" subtitle="Notes and other details">
          <TextArea
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            error={getFieldError('notes')}
            placeholder="Add any additional notes about this lead..."
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
              {isSubmitting ? 'Saving...' : 'Save Lead'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default AddLead;