import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, Phone, Mail, Calendar, User, Plus, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, DataTable, Badge, Dropdown } from '../widgets';

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Follow-up' | 'Demo' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  dueDate: string;
  assignedTo: string;
  relatedTo: string;
  relatedType: 'Contact' | 'Lead' | 'Account' | 'Deal';
  createdAt: string;
}

/**
 * Tasks page for managing tasks and activities
 */
const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow up with Acme Corp',
      description: 'Discuss pricing for enterprise package',
      type: 'Call',
      priority: 'High',
      status: 'Pending',
      dueDate: '2024-01-20',
      assignedTo: 'John Smith',
      relatedTo: 'Acme Corporation',
      relatedType: 'Account',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Send proposal to Tech Solutions',
      description: 'Send detailed proposal for software integration',
      type: 'Email',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '2024-01-18',
      assignedTo: 'Sarah Johnson',
      relatedTo: 'Tech Solutions Inc',
      relatedType: 'Lead',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Product demo for Global Industries',
      description: 'Schedule and conduct product demonstration',
      type: 'Demo',
      priority: 'High',
      status: 'Pending',
      dueDate: '2024-01-22',
      assignedTo: 'Mike Davis',
      relatedTo: 'Global Industries',
      relatedType: 'Deal',
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      title: 'Meeting with Alice Johnson',
      description: 'Quarterly business review meeting',
      type: 'Meeting',
      priority: 'Medium',
      status: 'Completed',
      dueDate: '2024-01-16',
      assignedTo: 'John Smith',
      relatedTo: 'Alice Johnson',
      relatedType: 'Contact',
      createdAt: '2024-01-12'
    }
  ]);

  const stats = [
    { title: 'Total Tasks', value: tasks.length.toString(), icon: Clock, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'Pending', value: tasks.filter(t => t.status === 'Pending').length.toString(), icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { title: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length.toString(), icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Completed', value: tasks.filter(t => t.status === 'Completed').length.toString(), icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
  ];

  const handleComplete = (task: Task) => {
    setTasks(prev => prev.map(t => 
      t.id === task.id 
        ? { ...t, status: 'Completed' as const }
        : t
    ));
    toast.success('Task completed!', {
      description: `${task.title} has been marked as completed.`
    });
  };

  const handleEdit = (task: Task) => {
    navigate(`/tasks/edit/${task.id}`);
  };

  const handleDelete = (task: Task) => {
    toast('Delete Task', {
      description: `Are you sure you want to delete "${task.title}"?`,
      action: {
        label: 'Delete',
        onClick: () => {
          setTasks(prev => prev.filter(t => t.id !== task.id));
          toast.success('Task deleted successfully');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const getTypeIcon = (type: Task['type']) => {
    const icons = {
      'Call': Phone,
      'Email': Mail,
      'Meeting': Calendar,
      'Follow-up': User,
      'Demo': Calendar,
      'Other': Clock
    };
    const Icon = icons[type];
    return <Icon className="w-4 h-4" />;
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const variants = {
      'Low': 'default' as const,
      'Medium': 'warning' as const,
      'High': 'danger' as const,
      'Urgent': 'danger' as const
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: Task['status']) => {
    const variants = {
      'Pending': 'warning' as const,
      'In Progress': 'primary' as const,
      'Completed': 'success' as const,
      'Cancelled': 'default' as const
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const columns = [
    {
      key: 'title' as keyof Task,
      title: 'Task',
      sortable: true,
      render: (value: string, row: Task) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            {getTypeIcon(row.type)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'type' as keyof Task,
      title: 'Type',
      sortable: true,
      render: (value: Task['type']) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'priority' as keyof Task,
      title: 'Priority',
      sortable: true,
      render: (value: Task['priority']) => getPriorityBadge(value)
    },
    {
      key: 'status' as keyof Task,
      title: 'Status',
      sortable: true,
      render: (value: Task['status']) => getStatusBadge(value)
    },
    {
      key: 'dueDate' as keyof Task,
      title: 'Due Date',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'assignedTo' as keyof Task,
      title: 'Assigned To',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'relatedTo' as keyof Task,
      title: 'Related To',
      render: (value: string, row: Task) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{row.relatedType}</div>
        </div>
      )
    }
  ];

  const getRowActions = (task: Task) => (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      }
      options={[
        ...(task.status !== 'Completed' ? [{
          label: 'Mark Complete',
          value: 'complete',
          icon: <CheckCircle className="w-4 h-4" />,
        }] : []),
        {
          label: 'Edit',
          value: 'edit',
          icon: <Calendar className="w-4 h-4" />,
        },
        {
          label: 'Delete',
          value: 'delete',
          icon: <AlertCircle className="w-4 h-4" />,
          danger: true,
        },
      ]}
      onSelect={(option) => {
        switch (option.value) {
          case 'complete':
            handleComplete(task);
            break;
          case 'edit':
            handleEdit(task);
            break;
          case 'delete':
            handleDelete(task);
            break;
        }
      }}
    />
  );

  const handleRowClick = (task: Task) => {
    toast.info('Task Details', {
      description: `Viewing details for "${task.title}"`,
      action: {
        label: 'Edit',
        onClick: () => handleEdit(task),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tasks Management</h1>
        <Button onClick={() => navigate('/tasks/add')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Task
        </Button>
      </div>

      {/* Task Stats */}
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

      {/* Tasks DataTable */}
      <DataTable
        data={tasks}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search tasks by title, assignee, or related entity..."
        onRowClick={handleRowClick}
        actions={getRowActions}
        emptyMessage="No tasks found. Add your first task to get started."
      />
    </div>
  );
};

export default Tasks;