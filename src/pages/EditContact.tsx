import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Mail, Phone, Building, MapPin, Tag, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, Input, TextArea, Select } from '../widgets';
import { contactSchema, type ContactFormData } from '../schemas/contactSchema';

// Mock contact data - in real app, this would come from API/database
const mockContacts = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    role: 'Sales Manager',
    status: 'Active' as const,
    lastContact: '2024-01-15',
    createdAt: '2023-12-01'
  },
  {
    id: '2',
    name: 'Bob Williams',
    email: 'bob@techsolutions.com',
    phone: '+1 (555) 987-6543',
    company: 'Tech Solutions',
    role: 'CTO',
    status: 'Active' as const,
    lastContact: '2024-01-10',
    createdAt: '2023-11-15'
  },
  // Add more mock contacts as needed
];

/**
 * Edit Contact page with inline form in content area
 */
const EditContact: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    department: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    notes: '',
    tags: [],
    status: 'Active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const departmentOptions = [
    { label: 'Sales', value: 'sales' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'HR', value: 'hr' },
    { label: 'Finance', value: 'finance' },
    { label: 'Operations', value: 'operations' },
    { label: 'Customer Success', value: 'customer-success' },
    { label: 'Other', value: 'other' }
  ];

  const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Pending', value: 'Pending' }
  ];

  // Load contact data
  useEffect(() => {
    const loadContact = async () => {
      if (!id) {
        navigate('/contacts');
        return;
      }

      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const contact = mockContacts.find(c => c.id === id);
        
        if (!contact) {
          toast.error('Contact not found', {
            description: 'The contact you are looking for does not exist.'
          });
          navigate('/contacts');
          return;
        }

        // Parse name
        const nameParts = contact.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        setContactName(contact.name);
        setFormData({
          firstName,
          lastName,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          position: contact.role,
          department: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States'
          },
          notes: '',
          tags: [],
          status: contact.status
        });
        
      } catch (error) {
        console.error('Error loading contact:', error);
        toast.error('Failed to load contact', {
          description: 'Please try again or contact support if the problem persists.'
        });
        navigate('/contacts');
      } finally {
        setIsLoading(false);
      }
    };

    loadContact();
  }, [id, navigate]);

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData);
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
      
      // Show toast for validation errors
      toast.error('Please fix the form errors before submitting', {
        description: 'Check the highlighted fields and try again.'
      });
      
      return false;
    }
  };

  const getFieldError = (fieldPath: string): string | undefined => {
    return errors[fieldPath];
  };

  const handleInputChange = (field: keyof ContactFormData, value: any) => {
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

  const handleAddressChange = (field: keyof ContactFormData['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));

    // Clear address field errors
    const fieldPath = `address.${field}`;
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
      
      // Success toast
      toast.success('Contact updated successfully!', {
        description: `${formData.firstName} ${formData.lastName}'s information has been updated.`,
        action: {
          label: 'View Contacts',
          onClick: () => navigate('/contacts'),
        },
      });
      
      // Navigate back to contacts
      navigate('/contacts');
      
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact', {
        description: 'Please try again or contact support if the problem persists.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/contacts');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loading Contact...</h1>
            <p className="text-gray-600">Please wait while we load the contact information</p>
          </div>
          <Button variant="outline" onClick={handleCancel}>
            Back to Contacts
          </Button>
        </div>
        
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Loading contact details...</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Contact</h1>
          <p className="text-gray-600">Update {contactName}'s information</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Back to Contacts
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card title="Basic Information" subtitle="Update the contact's basic details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name *"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={getFieldError('firstName')}
              placeholder="John"
              fullWidth
            />
            <Input
              label="Last Name *"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={getFieldError('lastName')}
              placeholder="Doe"
              fullWidth
            />
          </div>
        </Card>

        {/* Contact Information */}
        <Card title="Contact Information" subtitle="How to reach this contact">
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

        {/* Professional Information */}
        <Card title="Professional Information" subtitle="Work-related details">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                error={getFieldError('company')}
                placeholder="Acme Corporation"
                fullWidth
              />
              <Input
                label="Position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                error={getFieldError('position')}
                placeholder="Sales Manager"
                fullWidth
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Department"
                options={departmentOptions}
                value={formData.department}
                onChange={(value) => handleInputChange('department', value)}
                error={getFieldError('department')}
                placeholder="Select department"
                fullWidth
              />
              <Select
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value as ContactFormData['status'])}
                error={getFieldError('status')}
                fullWidth
              />
            </div>
          </div>
        </Card>

        {/* Address Information */}
        <Card title="Address Information" subtitle="Contact's location details">
          <div className="space-y-6">
            <Input
              label="Street Address"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              error={getFieldError('address.street')}
              placeholder="123 Main Street"
              fullWidth
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="City"
                value={formData.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                error={getFieldError('address.city')}
                placeholder="New York"
                fullWidth
              />
              <Input
                label="State"
                value={formData.address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                error={getFieldError('address.state')}
                placeholder="NY"
                fullWidth
              />
              <Input
                label="ZIP Code"
                value={formData.address.zipCode}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                error={getFieldError('address.zipCode')}
                placeholder="10001"
                fullWidth
              />
            </div>
            <Input
              label="Country"
              value={formData.address.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              error={getFieldError('address.country')}
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
            error={getFieldError('notes')}
            placeholder="Add any additional notes about this contact..."
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
              {isSubmitting ? 'Updating...' : 'Update Contact'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditContact;