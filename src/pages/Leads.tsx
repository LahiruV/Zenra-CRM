import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Phone, Mail, Edit, Trash2, Plus, MoreHorizontal, User, Calendar, Target, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, DataTable, Badge, Dropdown } from '../widgets';

interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  source: string;
  estimatedValue: number;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedToId: string;
  assignedToName: string;
  expectedCloseDate?: string;
  lastActivityDate?: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Leads page with comprehensive CRUD operations
 */
const Leads: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = React.useState<Lead[]>([
    {
      id: '1',
      companyName: 'Acme Corporation',
      contactName: 'John Smith',
      email: 'john@acme.com',
      phone: '+1 (555) 123-4567',
      status: 'Qualified',
      source: 'Website',
      estimatedValue: 15000,
      priority: 'High',
      assignedToId: '1',
      assignedToName: 'Alice Johnson',
      expectedCloseDate: '2024-02-15',
      lastActivityDate: '2024-01-18',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      companyName: 'Tech Solutions Inc',
      contactName: 'Sarah Johnson',
      email: 'sarah@techsolutions.com',
      phone: '+1 (555) 987-6543',
      status: 'Contacted',
      source: 'Referral',
      estimatedValue: 8500,
      priority: 'Medium',
      assignedToId: '2',
      assignedToName: 'Bob Williams',
      expectedCloseDate: '2024-02-28',
      lastActivityDate: '2024-01-16',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      companyName: 'Global Industries',
      contactName: 'Mike Davis',
      email: 'mike@global.com',
      phone: '+1 (555) 456-7890',
      status: 'New',
      source: 'Cold Call',
      estimatedValue: 22000,
      priority: 'High',
      assignedToId: '3',
      assignedToName: 'Carol Davis',
      expectedCloseDate: '2024-03-15',
      createdAt: '2024-01-05'
    },
    {
      id: '4',
      companyName: 'Startup Inc',
      contactName: 'Emma Wilson',
      email: 'emma@startup.io',
      phone: '+1 (555) 321-0987',
      status: 'Proposal',
      source: 'Trade Show',
      estimatedValue: 35000,
      priority: 'Urgent',
      assignedToId: '1',
      assignedToName: 'Alice Johnson',
      expectedCloseDate: '2024-01-30',
      lastActivityDate: '2024-01-19',
      createdAt: '2024-01-08'
    },
  ]);

  const [users] = React.useState<User[]>([
    { id: '1', name: 'Alice Johnson', email: 'alice@company.com', role: 'Sales Manager' },
    { id: '2', name: 'Bob Williams', email: 'bob@company.com', role: 'Sales Rep' },
    { id: '3', name: 'Carol Davis', email: 'carol@company.com', role: 'Account Manager' },
    { id: '4', name: 'David Chen', email: 'david@company.com', role: 'Sales Rep' },
  ]);

  // Pipeline stages
  const pipelineStages = [
    { name: 'New', count: leads.filter(l => l.status === 'New').length, color: 'bg-gray-500' },
    { name: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: 'bg-blue-500' },
    { name: 'Qualified', count: leads.filter(l => l.status === 'Qualified').length, color: 'bg-yellow-500' },
    { name: 'Proposal', count: leads.filter(l => l.status === 'Proposal').length, color: 'bg-purple-500' },
    { name: 'Negotiation', count: leads.filter(l => l.status === 'Negotiation').length, color: 'bg-orange-500' },
    { name: 'Closed Won', count: leads.filter(l => l.status === 'Closed Won').length, color: 'bg-green-500' },
    { name: 'Closed Lost', count: leads.filter(l => l.status === 'Closed Lost').length, color: 'bg-red-500' },
  ];

  const totalValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  const qualifiedLeads = leads.filter(l => ['Qualified', 'Proposal', 'Negotiation'].includes(l.status));
  const closedWonLeads = leads.filter(l => l.status === 'Closed Won');

  const stats = [
    { title: 'Total Leads', value: leads.length.toString(), icon: TrendingUp, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'Qualified', value: qualifiedLeads.length.toString(), icon: Target, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { title: 'Total Value', value: `$${(totalValue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Closed Won', value: closedWonLeads.length.toString(), icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100' },
  ];

  const handleEdit = (lead: Lead) => {
    navigate(`/leads/edit/${lead.id}`);
  };

  const handleDelete = (lead: Lead) => {
    toast('Delete Lead', {
      description: `Are you sure you want to delete ${lead.companyName}?`,
      action: {
        label: 'Delete',
        onClick: () => {
          setLeads(prev => prev.filter(l => l.id !== lead.id));
          toast.success('Lead deleted successfully');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleAssignLead = (lead: Lead, userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setLeads(prev => prev.map(l => 
        l.id === lead.id 
          ? { ...l, assignedToId: user.id, assignedToName: user.name }
          : l
      ));
      toast.success('Lead assigned successfully', {
        description: `${lead.companyName} assigned to ${user.name}`
      });
    }
  };

  const handleStatusChange = (lead: Lead, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(l => 
      l.id === lead.id 
        ? { ...l, status: newStatus, lastActivityDate: new Date().toISOString().split('T')[0] }
        : l
    ));
    toast.success('Lead status updated', {
      description: `${lead.companyName} moved to ${newStatus}`
    });
  };

  const handleCall = (lead: Lead) => {
    toast.info('Calling lead...', {
      description: `Initiating call to ${lead.contactName} at ${lead.phone}`,
    });
  };

  const handleEmail = (lead: Lead) => {
    window.open(`mailto:${lead.email}?subject=Hello ${lead.contactName}`);
    toast.success('Email client opened');
  };

  const getStatusBadge = (status: Lead['status']) => {
    const variants = {
      'New': 'default' as const,
      'Contacted': 'primary' as const,
      'Qualified': 'secondary' as const,
      'Proposal': 'warning' as const,
      'Negotiation': 'secondary' as const,
      'Closed Won': 'success' as const,
      'Closed Lost': 'danger' as const
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: Lead['priority']) => {
    const variants = {
      'Low': 'default' as const,
      'Medium': 'primary' as const,
      'High': 'warning' as const,
      'Urgent': 'danger' as const
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  const columns = [
    {
      key: 'companyName' as keyof Lead,
      title: 'Company',
      sortable: true,
      render: (value: string, row: Lead) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.contactName}</div>
        </div>
      )
    },
    {
      key: 'email' as keyof Lead,
      title: 'Email',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'phone' as keyof Lead,
      title: 'Phone',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'status' as keyof Lead,
      title: 'Status',
      sortable: true,
      render: (value: Lead['status']) => getStatusBadge(value)
    },
    {
      key: 'priority' as keyof Lead,
      title: 'Priority',
      sortable: true,
      render: (value: Lead['priority']) => getPriorityBadge(value)
    },
    {
      key: 'estimatedValue' as keyof Lead,
      title: 'Value',
      sortable: true,
      render: (value: number) => (
        <div className="font-medium text-gray-900">
          ${(value / 1000).toFixed(0)}K
        </div>
      )
    },
    {
      key: 'source' as keyof Lead,
      title: 'Source',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'assignedToName' as keyof Lead,
      title: 'Assigned To',
      render: (value: string) => (
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1 text-gray-400" />
          <span className="text-sm text-gray-600">{value}</span>
        </div>
      )
    },
    {
      key: 'expectedCloseDate' as keyof Lead,
      title: 'Expected Close',
      sortable: true,
      render: (value: string | undefined) => (
        <div className="text-sm text-gray-600">
          {value ? new Date(value).toLocaleDateString() : '-'}
        </div>
      )
    }
  ];

  const getRowActions = (lead: Lead) => (
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
          label: 'Move to Contacted',
          value: 'contacted',
          icon: <Target className="w-4 h-4" />,
          disabled: lead.status === 'Contacted'
        },
        {
          label: 'Move to Qualified',
          value: 'qualified',
          icon: <Target className="w-4 h-4" />,
          disabled: lead.status === 'Qualified'
        },
        {
          label: 'Move to Proposal',
          value: 'proposal',
          icon: <Target className="w-4 h-4" />,
          disabled: lead.status === 'Proposal'
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
            handleCall(lead);
            break;
          case 'email':
            handleEmail(lead);
            break;
          case 'contacted':
            handleStatusChange(lead, 'Contacted');
            break;
          case 'qualified':
            handleStatusChange(lead, 'Qualified');
            break;
          case 'proposal':
            handleStatusChange(lead, 'Proposal');
            break;
          case 'assign':
            // Show assignment dialog (simplified for demo)
            const userId = prompt('Enter user ID (1-4):');
            if (userId && users.find(u => u.id === userId)) {
              handleAssignLead(lead, userId);
            }
            break;
          case 'edit':
            handleEdit(lead);
            break;
          case 'delete':
            handleDelete(lead);
            break;
        }
      }}
    />
  );

  const handleRowClick = (lead: Lead) => {
    toast.info('Lead Details', {
      description: `Viewing details for ${lead.companyName}`,
      action: {
        label: 'Edit',
        onClick: () => handleEdit(lead),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
        <Button onClick={() => navigate('/leads/add')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Lead
        </Button>
      </div>

      {/* Lead Stats */}
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

      {/* Lead Pipeline */}
      <Card title="Lead Pipeline" subtitle="Track leads through your sales process">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`w-8 h-8 ${stage.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{stage.count}</span>
              </div>
              <div className="text-sm font-medium text-gray-900">{stage.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {stage.count} lead{stage.count !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leads DataTable */}
      <DataTable
        data={leads}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search leads by company, contact, email, or assigned user..."
        onRowClick={handleRowClick}
        actions={getRowActions}
        emptyMessage="No leads found. Add your first lead to get started."
      />
    </div>
  );
};

export default Leads;