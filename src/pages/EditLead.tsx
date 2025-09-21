import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrendingUp, Mail, Phone, Building, DollarSign, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, Input, TextArea, Select } from '../widgets';
import { leadSchema, type LeadFormData } from '../schemas/contactSchema';

// Mock lead data
const mockLeads = [
  {
    id: '1',
    companyName: 'Acme Corporation',
    contactName: 'John Smith',
    email: 'john@acme.com',
    phone: '+1 (555) 123-4567',
    source: 'Website',
    estimatedValue: 15000,
    status: 'Hot' as const,
    notes: 'Interested in enterprise package'
  },
  {
    id: '2',
    companyName: 'Tech Solutions Inc',
    contactName: 'Sarah Johnson',
    email: 'sarah@techsolutions.com',
    phone: '+1 (555) 987-6543',
    source: 'Referral',
    estimatedValue: 8500,
    status: 'Warm' as const,
    notes: 'Looking for software integration'
  }
];

/**
 * Edit Lead page
 */
const EditLead: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<LeadFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    source: '',
    estimatedValue: 0,
    status: 'Cold',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leadName, setLeadName] = useState('');

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

  const statusOptions = [
    { label: 'Hot', value: 'Hot' },
    { label: 'Warm', value: 'Warm' },
    { label: 'Cold', value: 'Cold' },
    { label: 'Qualified', value: 'Qualified' },
    { label: 'Converted', value: 'Converted' },
    { label: 'Lost', value: 'Lost' }
  ];

  // Load lead data
  useEffect(() => {
    const loadLead = async () => {
      if (!id) {
        navigate('/leads');
        return;
      }

      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const lead = mockLeads.find(l => l.id === id);
        
        if (!lead) {
          toast.error('Lead not found');
          navigate('/leads');
          return;
        }

        setLeadName(lead.companyName);
        setFormData({
          companyName: lead.companyName,
          contactName: lead.contactName,
          email: lead.email,
          phone: lead.phone,
          source: lead.source,
          estimatedValue: lead.estimatedValue,
          status: lead.status,
          notes: lead.notes
        });
        
      } catch (error) {
        console.error('Error loading lead:', error);
        toast.error('Failed to load lead');
        navigate('/leads');
      } finally {
        setIsLoading(false);
      }
    };

    loadLead();
  }, [id, navigate]);

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
      
      toast.success('Lead updated successfully!', {
        description: `${formData.companyName} has been updated.`,
        action: {
          label: 'View Leads',
          onClick: () => navigate('/leads'),
        },
      });
      
      navigate('/leads');
      
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/leads');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loading Lead...</h1>
            <p className="text-gray-600">Please wait while we load the lead information</p>
          </div>
          <Button variant="outline" onClick={handleCancel}>
            Back to Leads
          </Button>
        </div>
        
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Loading lead details...</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Lead</h1>
          <p className="text-gray-600">Update {leadName}'s information</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Back to Leads
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <Card title="Company Information" subtitle="Update the lead's company details">
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
        <Card title="Lead Details" subtitle="Lead qualification and value information">
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
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value as LeadFormData['status'])}
                error={getFieldError('status')}
                fullWidth
              />
            </div>
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
          </div>
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
              {isSubmitting ? 'Updating...' : 'Update Lead'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditLead;