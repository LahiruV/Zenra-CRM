import React, { useState } from 'react';
import { DollarSign, TrendingUp, Target, Calendar, Edit, Trash2, Plus, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, DataTable, Badge, Dropdown } from '../widgets';

interface Deal {
  id: string;
  name: string;
  value: number;
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  expectedCloseDate: string;
  account: string;
  contact: string;
  owner: string;
  source: string;
  createdAt: string;
}

/**
 * Deals page for managing sales opportunities
 */
const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      name: 'Acme Corp - Enterprise License',
      value: 150000,
      stage: 'Proposal',
      probability: 75,
      expectedCloseDate: '2024-02-15',
      account: 'Acme Corporation',
      contact: 'Alice Johnson',
      owner: 'John Smith',
      source: 'Website',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Tech Solutions - Integration Project',
      value: 85000,
      stage: 'Negotiation',
      probability: 90,
      expectedCloseDate: '2024-01-30',
      account: 'Tech Solutions Inc',
      contact: 'Bob Williams',
      owner: 'Sarah Johnson',
      source: 'Referral',
      createdAt: '2024-01-05'
    },
    {
      id: '3',
      name: 'Global Industries - Annual Contract',
      value: 220000,
      stage: 'Qualification',
      probability: 50,
      expectedCloseDate: '2024-03-01',
      account: 'Global Industries',
      contact: 'Carol Davis',
      owner: 'Mike Davis',
      source: 'Cold Call',
      createdAt: '2023-12-20'
    },
    {
      id: '4',
      name: 'Startup Inc - Basic Package',
      value: 25000,
      stage: 'Closed Won',
      probability: 100,
      expectedCloseDate: '2024-01-15',
      account: 'Startup Inc',
      contact: 'David Chen',
      owner: 'John Smith',
      source: 'Trade Show',
      createdAt: '2023-12-15'
    }
  ]);

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const pipelineValue = deals.filter(d => !['Closed Won', 'Closed Lost'].includes(d.stage)).reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(d => d.stage === 'Closed Won');
  const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);

  const stats = [
    { title: 'Total Pipeline', value: `$${(pipelineValue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'Deals Won', value: wonDeals.length.toString(), icon: Target, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Won Value', value: `$${(wonValue / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Win Rate', value: `${Math.round((wonDeals.length / deals.length) * 100)}%`, icon: TrendingUp, color: 'text-secondary-600', bgColor: 'bg-secondary-100' },
  ];

  const handleEdit = (deal: Deal) => {
    toast.info('Edit Deal', {
      description: `Editing ${deal.name}`,
    });
  };

  const handleDelete = (deal: Deal) => {
    toast('Delete Deal', {
      description: `Are you sure you want to delete "${deal.name}"?`,
      action: {
        label: 'Delete',
        onClick: () => {
          setDeals(prev => prev.filter(d => d.id !== deal.id));
          toast.success('Deal deleted successfully');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleStageChange = (deal: Deal, newStage: Deal['stage']) => {
    setDeals(prev => prev.map(d => 
      d.id === deal.id 
        ? { ...d, stage: newStage, probability: newStage === 'Closed Won' ? 100 : newStage === 'Closed Lost' ? 0 : d.probability }
        : d
    ));
    toast.success('Deal stage updated', {
      description: `${deal.name} moved to ${newStage}`
    });
  };

  const getStageBadge = (stage: Deal['stage']) => {
    const variants = {
      'Prospecting': 'default' as const,
      'Qualification': 'warning' as const,
      'Proposal': 'primary' as const,
      'Negotiation': 'secondary' as const,
      'Closed Won': 'success' as const,
      'Closed Lost': 'danger' as const
    };
    return <Badge variant={variants[stage]}>{stage}</Badge>;
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    if (probability >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const columns = [
    {
      key: 'name' as keyof Deal,
      title: 'Deal Name',
      sortable: true,
      render: (value: string, row: Deal) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.account}</div>
        </div>
      )
    },
    {
      key: 'value' as keyof Deal,
      title: 'Value',
      sortable: true,
      render: (value: number) => (
        <div className="font-medium text-gray-900">
          ${(value / 1000).toFixed(0)}K
        </div>
      )
    },
    {
      key: 'stage' as keyof Deal,
      title: 'Stage',
      sortable: true,
      render: (value: Deal['stage']) => getStageBadge(value)
    },
    {
      key: 'probability' as keyof Deal,
      title: 'Probability',
      sortable: true,
      render: (value: number) => (
        <div className={`font-medium ${getProbabilityColor(value)}`}>
          {value}%
        </div>
      )
    },
    {
      key: 'expectedCloseDate' as keyof Deal,
      title: 'Close Date',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'owner' as keyof Deal,
      title: 'Owner',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    }
  ];

  const getRowActions = (deal: Deal) => (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      }
      options={[
        {
          label: 'Move to Proposal',
          value: 'proposal',
          icon: <Target className="w-4 h-4" />,
          disabled: deal.stage === 'Proposal'
        },
        {
          label: 'Move to Negotiation',
          value: 'negotiation',
          icon: <Target className="w-4 h-4" />,
          disabled: deal.stage === 'Negotiation'
        },
        {
          label: 'Mark as Won',
          value: 'won',
          icon: <Target className="w-4 h-4" />,
          disabled: deal.stage === 'Closed Won'
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
          case 'proposal':
            handleStageChange(deal, 'Proposal');
            break;
          case 'negotiation':
            handleStageChange(deal, 'Negotiation');
            break;
          case 'won':
            handleStageChange(deal, 'Closed Won');
            break;
          case 'edit':
            handleEdit(deal);
            break;
          case 'delete':
            handleDelete(deal);
            break;
        }
      }}
    />
  );

  const handleRowClick = (deal: Deal) => {
    toast.info('Deal Details', {
      description: `Viewing details for ${deal.name}`,
      action: {
        label: 'Edit',
        onClick: () => handleEdit(deal),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Deals Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Deal
        </Button>
      </div>

      {/* Deal Stats */}
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

      {/* Sales Pipeline Overview */}
      <Card title="Sales Pipeline" subtitle="Visual overview of deals by stage">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].map((stage) => {
            const stageDeals = deals.filter(d => d.stage === stage);
            const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
            
            return (
              <div key={stage} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{stageDeals.length}</div>
                <div className="text-sm text-gray-600 mb-1">{stage}</div>
                <div className="text-xs text-gray-500">${(stageValue / 1000).toFixed(0)}K</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Deals DataTable */}
      <DataTable
        data={deals}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search deals by name, account, or owner..."
        onRowClick={handleRowClick}
        actions={getRowActions}
        emptyMessage="No deals found. Add your first deal to get started."
      />
    </div>
  );
};

export default Deals;