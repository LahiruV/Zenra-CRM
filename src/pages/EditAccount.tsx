import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building, Mail, Phone, Globe, MapPin, Users, DollarSign, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, Input, TextArea, Select } from '../widgets';

interface AccountFormData {
  name: string;
  industry: string;
  website: string;
  phone: string;
  email: string;
  type: 'Prospect' | 'Customer' | 'Partner' | 'Competitor';
  status: 'Active' | 'Inactive' | 'Pending';
  employees: number;
  revenue: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  notes: string;
}

// Mock account data
const mockAccounts = [
  {
    id: '1',
    name: 'Acme Corporation',
    industry: 'Technology',
    website: 'https://acme.com',
    phone: '+1 (555) 123-4567',
    email: 'info@acme.com',
    type: 'Customer' as const,
    status: 'Active' as const,
    employees: 500,
    revenue: 5000000,
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States'
    },
    notes: 'Key customer in technology sector'
  }
];

/**
 * Edit Account page
 */
const EditAccount: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<AccountFormData>({
    name: '',
    industry: '',
    website: '',
    phone: '',
    email: '',
    type: 'Prospect',
    status: 'Active',
    employees: 0,
    revenue: 0,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accountName, setAccountName] = useState('');

  const industryOptions = [
    { label: 'Technology', value: 'Technology' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Manufacturing', value: 'Manufacturing' },
    { label: 'Retail', value: 'Retail' },
    { label: 'Education', value: 'Education' },
    { label: 'Real Estate', value: 'Real Estate' },
    { label: 'Consulting', value: 'Consulting' },
    { label: 'Other', value: 'Other' }
  ];

  const typeOptions = [
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Customer', value: 'Customer' },
    { label: 'Partner', value: 'Partner' },
    { label: 'Competitor', value: 'Competitor' }
  ];

  const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Pending', value: 'Pending' }
  ];

  // Load account data
  useEffect(() => {
    const loadAccount = async () => {
      if (!id) {
        navigate('/accounts');
        return;
      }

      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const account = mockAccounts.find(a => a.id === id);
        
        if (!account) {
          toast.error('Account not found');
          navigate('/accounts');
          return;
        }

        setAccountName(account.name);
        setFormData({
          name: account.name,
          industry: account.industry,
          website: account.website,
          phone: account.phone,
          email: account.email,
          type: account.type,
          status: account.status,
          employees: account.employees,
          revenue: account.revenue,
          address: account.address,
          notes: account.notes
        });
        
      } catch (error) {
        console.error('Error loading account:', error);
        toast.error('Failed to load account');
        navigate('/accounts');
      } finally {
        setIsLoading(false);
      }
    };

    loadAccount();
  }, [id, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'Website must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFieldError = (fieldPath: string): string | undefined => {
    return errors[fieldPath];
  };

  const handleInputChange = (field: keyof AccountFormData, value: any) => {
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

  const handleAddressChange = (field: keyof AccountFormData['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
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
      
      toast.success('Account updated successfully!', {
        description: `${formData.name} has been updated.`,
        action: {
          label: 'View Accounts',
          onClick: () => navigate('/accounts'),
        },
      });
      
      navigate('/accounts');
      
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('Failed to update account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/accounts');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loading Account...</h1>
            <p className="text-gray-600">Please wait while we load the account information</p>
          </div>
          <Button variant="outline" onClick={handleCancel}>
            Back to Accounts
          </Button>
        </div>
        
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Loading account details...</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Account</h1>
          <p className="text-gray-600">Update {accountName}'s information</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Back to Accounts
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card title="Basic Information" subtitle="Update the account's basic details">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company Name *"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={getFieldError('name')}
                placeholder="Acme Corporation"
                leftIcon={<Building className="w-4 h-4" />}
                fullWidth
              />
              <Select
                label="Industry"
                options={industryOptions}
                value={formData.industry}
                onChange={(value) => handleInputChange('industry', value)}
                error={getFieldError('industry')}
                placeholder="Select industry"
                fullWidth
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Account Type"
                options={typeOptions}
                value={formData.type}
                onChange={(value) => handleInputChange('type', value as AccountFormData['type'])}
                error={getFieldError('type')}
                fullWidth
              />
              <Select
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value as AccountFormData['status'])}
                error={getFieldError('status')}
                fullWidth
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card title="Contact Information" subtitle="How to reach this account">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={getFieldError('email')}
              placeholder="info@company.com"
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
          <Input
            label="Website"
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            error={getFieldError('website')}
            placeholder="https://www.company.com"
            leftIcon={<Globe className="w-4 h-4" />}
            fullWidth
          />
        </Card>

        {/* Company Details */}
        <Card title="Company Details" subtitle="Additional company information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Number of Employees"
              type="number"
              value={formData.employees}
              onChange={(e) => handleInputChange('employees', parseInt(e.target.value) || 0)}
              error={getFieldError('employees')}
              placeholder="100"
              leftIcon={<Users className="w-4 h-4" />}
              fullWidth
            />
            <Input
              label="Annual Revenue"
              type="number"
              value={formData.revenue}
              onChange={(e) => handleInputChange('revenue', parseInt(e.target.value) || 0)}
              error={getFieldError('revenue')}
              placeholder="1000000"
              leftIcon={<DollarSign className="w-4 h-4" />}
              fullWidth
            />
          </div>
        </Card>

        {/* Address Information */}
        <Card title="Address Information" subtitle="Company location details">
          <div className="space-y-6">
            <Input
              label="Street Address"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder="123 Main Street"
              fullWidth
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="City"
                value={formData.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                placeholder="New York"
                fullWidth
              />
              <Input
                label="State"
                value={formData.address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                placeholder="NY"
                fullWidth
              />
              <Input
                label="ZIP Code"
                value={formData.address.zipCode}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                placeholder="10001"
                fullWidth
              />
            </div>
            <Input
              label="Country"
              value={formData.address.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              placeholder="United States"
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
            placeholder="Add any additional notes about this account..."
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
              {isSubmitting ? 'Updating...' : 'Update Account'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditAccount;