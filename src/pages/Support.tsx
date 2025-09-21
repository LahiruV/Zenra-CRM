import React, { useState } from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle, Mail, Phone, MessageSquare, Edit, Trash2, Plus, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, DataTable, Badge, Dropdown } from '../widgets';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Pending Customer' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  type: 'Bug' | 'Feature Request' | 'Question' | 'Technical Issue' | 'Other';
  source: 'Email' | 'Phone' | 'Chat' | 'Web Form' | 'Social Media';
  customer: string;
  customerEmail: string;
  assignedTo: string;
  createdAt: string;
  responseTime?: number; // in hours
  slaBreached: boolean;
}

/**
 * Support page for managing customer support tickets
 */
const Support: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      subject: 'Login issues with mobile app',
      description: 'Unable to login to mobile application after recent update',
      status: 'Open',
      priority: 'High',
      type: 'Technical Issue',
      source: 'Email',
      customer: 'Alice Johnson',
      customerEmail: 'alice@acme.com',
      assignedTo: 'John Smith',
      createdAt: '2024-01-18',
      responseTime: 2,
      slaBreached: false
    },
    {
      id: '2',
      subject: 'Feature request: Dark mode',
      description: 'Request to add dark mode theme to the application',
      status: 'In Progress',
      priority: 'Normal',
      type: 'Feature Request',
      source: 'Web Form',
      customer: 'Bob Williams',
      customerEmail: 'bob@techsolutions.com',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-17',
      responseTime: 4,
      slaBreached: false
    },
    {
      id: '3',
      subject: 'Billing discrepancy',
      description: 'Charged twice for the same service this month',
      status: 'Pending Customer',
      priority: 'Urgent',
      type: 'Question',
      source: 'Phone',
      customer: 'Carol Davis',
      customerEmail: 'carol@global.com',
      assignedTo: 'Mike Davis',
      createdAt: '2024-01-16',
      responseTime: 1,
      slaBreached: true
    },
    {
      id: '4',
      subject: 'Data export not working',
      description: 'CSV export feature returns empty file',
      status: 'Resolved',
      priority: 'Medium',
      type: 'Bug',
      source: 'Chat',
      customer: 'David Chen',
      customerEmail: 'david@startup.io',
      assignedTo: 'John Smith',
      createdAt: '2024-01-15',
      responseTime: 6,
      slaBreached: false
    }
  ]);

  const stats = [
    { title: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length.toString(), icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { title: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length.toString(), icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length.toString(), icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'SLA Breached', value: tickets.filter(t => t.slaBreached).length.toString(), icon: XCircle, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  const handleEdit = (ticket: Ticket) => {
    toast.info('Edit Ticket', {
      description: `Editing ticket #${ticket.id}`,
    });
  };

  const handleDelete = (ticket: Ticket) => {
    toast('Delete Ticket', {
      description: `Are you sure you want to delete ticket #${ticket.id}?`,
      action: {
        label: 'Delete',
        onClick: () => {
          setTickets(prev => prev.filter(t => t.id !== ticket.id));
          toast.success('Ticket deleted successfully');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleStatusChange = (ticket: Ticket, newStatus: Ticket['status']) => {
    setTickets(prev => prev.map(t => 
      t.id === ticket.id 
        ? { ...t, status: newStatus }
        : t
    ));
    toast.success('Ticket status updated', {
      description: `Ticket #${ticket.id} moved to ${newStatus}`
    });
  };

  const handleReply = (ticket: Ticket) => {
    toast.info('Reply to Customer', {
      description: `Composing reply for ticket #${ticket.id}`,
    });
  };

  const getStatusBadge = (status: Ticket['status']) => {
    const variants = {
      'Open': 'danger' as const,
      'In Progress': 'primary' as const,
      'Pending Customer': 'warning' as const,
      'Resolved': 'success' as const,
      'Closed': 'default' as const
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: Ticket['priority']) => {
    const variants = {
      'Low': 'default' as const,
      'Normal': 'primary' as const,
      'High': 'warning' as const,
      'Urgent': 'danger' as const
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  const getSourceIcon = (source: Ticket['source']) => {
    const icons = {
      'Email': Mail,
      'Phone': Phone,
      'Chat': MessageSquare,
      'Web Form': AlertCircle,
      'Social Media': MessageSquare
    };
    const Icon = icons[source];
    return <Icon className="w-4 h-4" />;
  };

  const columns = [
    {
      key: 'id' as keyof Ticket,
      title: 'Ticket #',
      sortable: true,
      render: (value: string, row: Ticket) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            {getSourceIcon(row.source)}
          </div>
          <div>
            <div className="font-medium text-gray-900">#{value}</div>
            <div className="text-xs text-gray-500">{row.source}</div>
          </div>
        </div>
      )
    },
    {
      key: 'subject' as keyof Ticket,
      title: 'Subject',
      sortable: true,
      render: (value: string, row: Ticket) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.customer}</div>
        </div>
      )
    },
    {
      key: 'status' as keyof Ticket,
      title: 'Status',
      sortable: true,
      render: (value: Ticket['status']) => getStatusBadge(value)
    },
    {
      key: 'priority' as keyof Ticket,
      title: 'Priority',
      sortable: true,
      render: (value: Ticket['priority']) => getPriorityBadge(value)
    },
    {
      key: 'type' as keyof Ticket,
      title: 'Type',
      render: (value: Ticket['type']) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'assignedTo' as keyof Ticket,
      title: 'Assigned To',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'responseTime' as keyof Ticket,
      title: 'Response Time',
      render: (value: number | undefined, row: Ticket) => (
        <div className={`text-sm ${row.slaBreached ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
          {value ? `${value}h` : '-'}
          {row.slaBreached && <div className="text-xs text-red-500">SLA Breached</div>}
        </div>
      )
    }
  ];

  const getRowActions = (ticket: Ticket) => (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      }
      options={[
        {
          label: 'Reply',
          value: 'reply',
          icon: <Mail className="w-4 h-4" />,
        },
        {
          label: 'Mark In Progress',
          value: 'progress',
          icon: <Clock className="w-4 h-4" />,
          disabled: ticket.status === 'In Progress'
        },
        {
          label: 'Mark Resolved',
          value: 'resolved',
          icon: <CheckCircle className="w-4 h-4" />,
          disabled: ticket.status === 'Resolved'
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
          case 'reply':
            handleReply(ticket);
            break;
          case 'progress':
            handleStatusChange(ticket, 'In Progress');
            break;
          case 'resolved':
            handleStatusChange(ticket, 'Resolved');
            break;
          case 'edit':
            handleEdit(ticket);
            break;
          case 'delete':
            handleDelete(ticket);
            break;
        }
      }}
    />
  );

  const handleRowClick = (ticket: Ticket) => {
    toast.info('Ticket Details', {
      description: `Viewing details for ticket #${ticket.id}`,
      action: {
        label: 'Edit',
        onClick: () => handleEdit(ticket),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Ticket
        </Button>
      </div>

      {/* Support Stats */}
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

      {/* Support Tickets DataTable */}
      <DataTable
        data={tickets}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search tickets by subject, customer, or assignee..."
        onRowClick={handleRowClick}
        actions={getRowActions}
        emptyMessage="No support tickets found. Create your first ticket to get started."
      />
    </div>
  );
};

export default Support;