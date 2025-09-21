import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Phone, Mail, Building, Edit, Trash2, Plus, MoreHorizontal, User, Target, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, DataTable, Badge, Dropdown } from '../widgets';
import { type ContactFormData } from '../schemas/contactSchema';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId?: string;
  companyName: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  type: 'Customer' | 'Lead' | 'Prospect' | 'Partner';
  assignedToId?: string;
  assignedToName?: string;
  leadScore?: number;
  lastContact: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
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
      companyId: '1',
      companyName: 'Acme Corp',
      role: 'Sales Manager',
      status: 'Active',
      type: 'Customer',
      assignedToId: '1',
      assignedToName: 'John Smith',
      leadScore: 85,
      lastContact: '2024-01-15',
      createdAt: '2023-12-01'
    },
    {
      id: '2',
      name: 'Bob Williams',
      email: 'bob@techsolutions.com',
      phone: '+1 (555) 987-6543',
      companyId: '2',
      companyName: 'Tech Solutions',
      role: 'CTO',
      status: 'Active',
      type: 'Prospect',
      assignedToId: '2',
      assignedToName: 'Sarah Johnson',
      leadScore: 72,
      lastContact: '2024-01-10',
      createdAt: '2023-11-15'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@global.com',
      phone: '+1 (555) 456-7890',
      companyId: '3',
      companyName: 'Global Industries',
      role: 'Procurement Manager',
      status: 'Pending',
      type: 'Lead',
      assignedToId: '3',
      assignedToName: 'Mike Davis',
      leadScore: 58,
      lastContact: '2024-01-05',
      createdAt: '2023-10-20'
    },
    {
      id: '4',
      name: 'David Chen',
      email: 'david@startup.io',
      phone: '+1 (555) 321-0987',
      companyId: '4',
      companyName: 'Startup Inc',
      role: 'Founder',
      status: 'Active',
      type: 'Partner',
      assignedToId: '1',
      assignedToName: 'John Smith',
      leadScore: 91,
      lastContact: '2023-12-20',
      createdAt: '2023-09-10'
    },
    {
      id: '5',
      name: 'Emma Wilson',
      email: 'emma@enterprise.com',
      phone: '+1 (555) 654-3210',
      companyId: '5',
      companyName: 'Enterprise Corp',
      role: 'VP Sales',
      status: 'Active',
      type: 'Customer',
      assignedToId: '2',
      assignedToName: 'Sarah Johnson',
      leadScore: 78,
      lastContact: '2024-01-12',
      createdAt: '2023-08-05'
    }
  ]);
  
  const [users] = useState<User[]>([
    { id: '1', name: 'John Smith', email: 'john@company.com', role: 'Sales Manager' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Account Manager' },
    { id: '3', name: 'Mike Davis', email: 'mike@company.com', role: 'Sales Rep' },
    { id: '4', name: 'Lisa Brown', email: 'lisa@company.com', role: 'Customer Success' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const stats = [
    { title: 'Total Contacts', value: contacts.length.toString(), icon: Users, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'Active Contacts', value: contacts.filter(c => c.status === 'Active').length.toString(), icon: Building, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Customers', value: contacts.filter(c => c.type === 'Customer').length.toString(), icon: Star, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { title: 'Companies', value: new Set(contacts.map(c => c.companyName)).size.toString(), icon: Building, color: 'text-secondary-600', bgColor: 'bg-secondary-100' },
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

  const handleAssignContact = (contact: Contact, userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setContacts(prev => prev.map(c => 
        c.id === contact.id 
          ? { ...c, assignedToId: user.id, assignedToName: user.name }
          : c
      ));
      toast.success('Contact assigned successfully', {
        description: `${contact.name} assigned to ${user.name}`
      });
    }
  };

  const handleTypeChange = (contact: Contact, newType: Contact['type']) => {
    setContacts(prev => prev.map(c => 
      c.id === contact.id 
        ? { ...c, type: newType }
        : c
    ));
    toast.success('Contact type updated', {
      description: `${contact.name} marked as ${newType}`
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
            companyName: contactData.company || '',
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

  const getTypeBadge = (type: Contact['type']) => {
    const variants = {
      'Customer': 'success' as const,
      'Lead': 'warning' as const,
      'Prospect': 'primary' as const,
      'Partner': 'secondary' as const
    };
    return <Badge variant={variants[type]}>{type}</Badge>;
  };

  const getLeadScoreColor = (score?: number) => {
    if (!score) return 'text-gray-400';
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
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
      key: 'companyName' as keyof Contact,
      title: 'Company',
      sortable: true,
      render: (value: string) => (
        <div className="font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'type' as keyof Contact,
      title: 'Type',
      sortable: true,
      render: (value: Contact['type']) => getTypeBadge(value)
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
      key: 'leadScore' as keyof Contact,
      title: 'Score',
      sortable: true,
      render: (value: number | undefined) => (
        <div className={`text-sm font-medium ${getLeadScoreColor(value)}`}>
          {value || '-'}
        </div>
      )
    },
    {
      key: 'status' as keyof Contact,
      title: 'Status',
      sortable: true,
      render: (value: Contact['status']) => getStatusBadge(value)
    },
    {
      key: 'assignedToName' as keyof Contact,
      title: 'Assigned To',
      render: (value: string | undefined) => (
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1 text-gray-400" />
          <span className="text-sm text-gray-600">{value || 'Unassigned'}</span>
        </div>
      )
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
          label: 'Convert to Customer',
          value: 'customer',
          icon: <Star className="w-4 h-4" />,
          disabled: contact.type === 'Customer'
        },
        {
          label: 'Mark as Lead',
          value: 'lead',
          icon: <Target className="w-4 h-4" />,
          disabled: contact.type === 'Lead'
        },
        {
          label: 'Assign to User',
          value: 'assign',
          icon: <User className="w-4 h-4" />,
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
          case 'customer':
            handleTypeChange(contact, 'Customer');
            break;
          case 'lead':
            handleTypeChange(contact, 'Lead');
            break;
          case 'assign':
            // Show assignment dialog (simplified for demo)
            const userId = prompt('Enter user ID (1-4):');
            if (userId && users.find(u => u.id === userId)) {
              handleAssignContact(contact, userId);
            }
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

      {/* Contact Types Overview */}
      <Card title="Contact Types" subtitle="Distribution of contacts by type">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Customer', 'Lead', 'Prospect', 'Partner'].map((type) => {
            const count = contacts.filter(c => c.type === type).length;
            const percentage = Math.round((count / contacts.length) * 100);
            
            return (
              <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm font-medium text-gray-600">{type}s</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Contacts DataTable */}
      <DataTable
        data={contacts}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search contacts by name, email, company, or assigned user..."
        onRowClick={handleRowClick}
        actions={getRowActions}
        emptyMessage="No contacts found. Add your first contact to get started."
      />
    </div>
  );
};

export default Contacts;