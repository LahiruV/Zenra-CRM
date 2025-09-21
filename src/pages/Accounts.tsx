import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Phone, Mail, Globe, Edit, Trash2, Plus, MoreHorizontal, Users, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, DataTable, Badge, Dropdown } from '../widgets';

interface Account {
  id: string;
  name: string;
  industry: string;
  website: string;
  phone: string;
  email: string;
  type: 'Prospect' | 'Customer' | 'Partner' | 'Competitor';
  status: 'Active' | 'Inactive' | 'Pending';
  employees: number;
  revenue: number;
  owner: string;
  createdAt: string;
}

/**
 * Accounts page for managing companies and organizations
 */
const Accounts: React.FC = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Acme Corporation',
      industry: 'Technology',
      website: 'https://acme.com',
      phone: '+1 (555) 123-4567',
      email: 'info@acme.com',
      type: 'Customer',
      status: 'Active',
      employees: 500,
      revenue: 5000000,
      owner: 'John Smith',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      industry: 'Software',
      website: 'https://techsolutions.com',
      phone: '+1 (555) 987-6543',
      email: 'contact@techsolutions.com',
      type: 'Prospect',
      status: 'Active',
      employees: 150,
      revenue: 2000000,
      owner: 'Sarah Johnson',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Global Industries',
      industry: 'Manufacturing',
      website: 'https://global.com',
      phone: '+1 (555) 456-7890',
      email: 'info@global.com',
      type: 'Customer',
      status: 'Active',
      employees: 1200,
      revenue: 15000000,
      owner: 'Mike Davis',
      createdAt: '2024-01-05'
    }
  ]);

  const stats = [
    { title: 'Total Accounts', value: accounts.length.toString(), icon: Building, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'Active Customers', value: accounts.filter(a => a.type === 'Customer' && a.status === 'Active').length.toString(), icon: Users, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Prospects', value: accounts.filter(a => a.type === 'Prospect').length.toString(), icon: Building, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { title: 'Total Revenue', value: `$${(accounts.reduce((sum, a) => sum + a.revenue, 0) / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-secondary-600', bgColor: 'bg-secondary-100' },
  ];

  const handleEdit = (account: Account) => {
    navigate(`/accounts/edit/${account.id}`);
  };

  const handleDelete = (account: Account) => {
    toast('Delete Account', {
      description: `Are you sure you want to delete ${account.name}?`,
      action: {
        label: 'Delete',
        onClick: () => {
          setAccounts(prev => prev.filter(a => a.id !== account.id));
          toast.success('Account deleted successfully');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleCall = (account: Account) => {
    toast.info('Calling account...', {
      description: `Initiating call to ${account.name} at ${account.phone}`,
    });
  };

  const handleEmail = (account: Account) => {
    window.open(`mailto:${account.email}?subject=Hello ${account.name}`);
    toast.success('Email client opened');
  };

  const handleVisitWebsite = (account: Account) => {
    window.open(account.website, '_blank');
    toast.success('Opening website');
  };

  const getTypeBadge = (type: Account['type']) => {
    const variants = {
      'Customer': 'success' as const,
      'Prospect': 'warning' as const,
      'Partner': 'primary' as const,
      'Competitor': 'danger' as const
    };
    return <Badge variant={variants[type]}>{type}</Badge>;
  };

  const getStatusBadge = (status: Account['status']) => {
    const variants = {
      'Active': 'success' as const,
      'Inactive': 'default' as const,
      'Pending': 'warning' as const
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const columns = [
    {
      key: 'name' as keyof Account,
      title: 'Company',
      sortable: true,
      render: (value: string, row: Account) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.industry}</div>
          </div>
        </div>
      )
    },
    {
      key: 'type' as keyof Account,
      title: 'Type',
      sortable: true,
      render: (value: Account['type']) => getTypeBadge(value)
    },
    {
      key: 'status' as keyof Account,
      title: 'Status',
      sortable: true,
      render: (value: Account['status']) => getStatusBadge(value)
    },
    {
      key: 'employees' as keyof Account,
      title: 'Employees',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-600">{value.toLocaleString()}</div>
      )
    },
    {
      key: 'revenue' as keyof Account,
      title: 'Revenue',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm font-medium text-gray-900">
          ${(value / 1000000).toFixed(1)}M
        </div>
      )
    },
    {
      key: 'owner' as keyof Account,
      title: 'Owner',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    }
  ];

  const getRowActions = (account: Account) => (
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
          label: 'Visit Website',
          value: 'website',
          icon: <Globe className="w-4 h-4" />,
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
            handleCall(account);
            break;
          case 'email':
            handleEmail(account);
            break;
          case 'website':
            handleVisitWebsite(account);
            break;
          case 'edit':
            handleEdit(account);
            break;
          case 'delete':
            handleDelete(account);
            break;
        }
      }}
    />
  );

  const handleRowClick = (account: Account) => {
    toast.info('Account Details', {
      description: `Viewing details for ${account.name}`,
      action: {
        label: 'Edit',
        onClick: () => handleEdit(account),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Accounts Management</h1>
        <Button onClick={() => navigate('/accounts/add')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Account
        </Button>
      </div>

      {/* Account Stats */}
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

      {/* Accounts DataTable */}
      <DataTable
        data={accounts}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search accounts by name, industry, or owner..."
        onRowClick={handleRowClick}
        actions={getRowActions}
        emptyMessage="No accounts found. Add your first account to get started."
      />
    </div>
  );
};

export default Accounts;