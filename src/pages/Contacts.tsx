import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Phone, Mail, Building, Edit, Trash2, Plus, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, DataTable, Badge, Dropdown } from '../widgets';
import Breadcrumb from '../components/Breadcrumb';
import { type ContactFormData } from '../schemas/contactSchema';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastContact: string;
  createdAt: string;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  department: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  notes: string;
  tags: string[];
  status: 'Active' | 'Inactive' | 'Pending';
}

/**
 * Contacts page with DataTable implementation
 */
const Contacts: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@acme.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corp',
      role: 'Sales Manager',
      status: 'Active',
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
      status: 'Active',
      lastContact: '2024-01-10',
      createdAt: '2023-11-15'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@global.com',
      phone: '+1 (555) 456-7890',
      company: 'Global Industries',
      role: 'Procurement Manager',
      status: 'Pending',
      lastContact: '2024-01-05',
      createdAt: '2023-10-20'
    },
    {
      id: '4',
      name: 'David Chen',
      email: 'david@startup.io',
      phone: '+1 (555) 321-0987',
      company: 'Startup Inc',
      role: 'Founder',
      status: 'Inactive',
      lastContact: '2023-12-20',
      createdAt: '2023-09-10'
    },
    {
      id: '5',
      name: 'Emma Wilson',
      email: 'emma@enterprise.com',
      phone: '+1 (555) 654-3210',
      company: 'Enterprise Corp',
      role: 'VP Sales',
      status: 'Active',
      lastContact: '2024-01-12',
      createdAt: '2023-08-05'
    }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const stats = [
    { title: 'Total Contacts', value: contacts.length.toString(), icon: Users, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'Active Contacts', value: contacts.filter(c => c.status === 'Active').length.toString(), icon: Building, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Companies', value: new Set(contacts.map(c => c.company)).size.toString(), icon: Building, color: 'text-secondary-600', bgColor: 'bg-secondary-100' },
    { title: 'This Month', value: '12', icon: Mail, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  const handleEdit = (contact: Contact) => {
    navigate(`/contacts/edit/${contact.id}`);
  };

  const handleDelete = (contact: Contact) => {
    // Show confirmation toast
    toast('Delete Contact', {
      description: `Are you sure you want to delete ${contact.name}?`,
      action: {
        label: 'Delete',
        onClick: () => {
          setContacts(prev => prev.filter(c => c.id !== contact.id));
          toast.success('Contact deleted successfully', {
            description: `${contact.name} has been removed from your contacts.`
          });
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleAddContact = (contactData: ContactFormData) => {
    navigate('/contacts/add');
  };

  const handleEditContact = (contactData: ContactFormData & { id: string }) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactData.id 
        ? {
            ...contact,
            name: `${contactData.firstName} ${contactData.lastName}`,
            email: contactData.email,
            phone: contactData.phone,
            company: contactData.company,
            role: contactData.position,
            status: contactData.status
          }
        : contact
    ));
    console.log('Updated contact:', contactData);
  };

  const handleCall = (contact: Contact) => {
    toast.info('Calling contact...', {
      description: `Initiating call to ${contact.name} at ${contact.phone}`,
      action: {
        label: 'Cancel',
        onClick: () => toast.dismiss(),
      },
    });
  };

  const handleEmail = (contact: Contact) => {
    // Simulate opening email client
    window.open(`mailto:${contact.email}?subject=Hello ${contact.name}`);
    toast.success('Email client opened', {
      description: `Composing email to ${contact.name}`
    });
  };

  const getStatusBadge = (status: Contact['status']) => {
    const variants = {
      'Active': 'success' as const,
      'Inactive': 'default' as const,
      'Pending': 'warning' as const
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const columns = [
    {
      key: 'name' as keyof Contact,
      title: 'Name',
      sortable: true,
      render: (value: string, row: Contact) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-semibold text-sm">
              {row.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.role}</div>
          </div>
        </div>
      )
    },
    {
      key: 'company' as keyof Contact,
      title: 'Company',
      sortable: true,
      render: (value: string) => (
        <div className="font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'email' as keyof Contact,
      title: 'Email',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'phone' as keyof Contact,
      title: 'Phone',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'status' as keyof Contact,
      title: 'Status',
      sortable: true,
      render: (value: Contact['status']) => getStatusBadge(value)
    },
    {
      key: 'lastContact' as keyof Contact,
      title: 'Last Contact',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ];

  const getRowActions = (contact: Contact) => (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      }
      options={[
        {
          label: 'Call',
          value: 'call',
          icon: <Phone className="w-4 h-4" />,
        },
        {
          label: 'Email',
          value: 'email',
          icon: <Mail className="w-4 h-4" />,
        },
        {
          label: 'Edit',
          value: 'edit',
          icon: <Edit className="w-4 h-4" />,
        },
        {
          label: 'Delete',
          value: 'delete',
          icon: <Trash2 className="w-4 h-4" />,
          danger: true,
        },
      ]}
      onSelect={(option) => {
        switch (option.value) {
          case 'call':
            handleCall(contact);
            break;
          case 'email':
            handleEmail(contact);
            break;
          case 'edit':
            handleEdit(contact);
            break;
          case 'delete':
            handleDelete(contact);
            break;
        }
      }}
    />
  );

  const handleRowClick = (contact: Contact) => {
    toast.info('Contact Details', {
      description: `Viewing details for ${contact.name}`,
      action: {
        label: 'Edit',
        onClick: () => handleEdit(contact),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Contacts', current: true }
        ]} 
      />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contacts Management</h1>
        <Button onClick={() => navigate('/contacts/add')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Contact
        </Button>
      </div>

      {/* Contact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Contacts DataTable */}
      <DataTable
        data={contacts}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search contacts by name, email, or company..."
        onRowClick={handleRowClick}
        actions={getRowActions}
        emptyMessage="No contacts found. Add your first contact to get started."
      />

    </div>
  );
};

export default Contacts;