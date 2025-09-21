import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Users,
  Target,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, Badge, Dropdown, Input, Select } from '../widgets';
import { Event } from '../model/Event';

/**
 * Task Calendar Scheduler page for managing task schedules and events
 */
const TaskCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'agenda' | 'month' | 'week' | 'day'>('agenda');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Mock task events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Follow up call with Acme Corp',
      description: 'Discuss pricing for enterprise package',
      type: 'Call',
      priority: 'High',
      status: 'Scheduled',
      startDate: new Date(2024, 0, 20, 10, 0),
      endDate: new Date(2024, 0, 20, 10, 30),
      allDay: false,
      location: 'Phone Call',
      relatedToType: 'Account',
      relatedToId: '1',
      relatedToName: 'Acme Corporation',
      assignedToId: '1',
      assignedToName: 'John Smith',
      createdById: '1',
      createdByName: 'John Smith',
      reminder: 15,
      tags: ['sales', 'follow-up'],
      notes: 'Important client - potential $150K deal',
      createdAt: new Date(2024, 0, 15),
      updatedAt: new Date(2024, 0, 15)
    },
    {
      id: '2',
      title: 'Product demo for Tech Solutions',
      description: 'Demonstrate new features and capabilities',
      type: 'Demo',
      priority: 'Medium',
      status: 'Scheduled',
      startDate: new Date(2024, 0, 22, 14, 0),
      endDate: new Date(2024, 0, 22, 15, 0),
      allDay: false,
      location: 'Zoom Meeting',
      attendees: ['sarah@techsolutions.com', 'mike@techsolutions.com'],
      relatedToType: 'Lead',
      relatedToId: '2',
      relatedToName: 'Tech Solutions Inc',
      assignedToId: '2',
      assignedToName: 'Sarah Johnson',
      createdById: '2',
      createdByName: 'Sarah Johnson',
      reminder: 30,
      recurring: 'None',
      tags: ['demo', 'sales'],
      createdAt: new Date(2024, 0, 16),
      updatedAt: new Date(2024, 0, 16)
    },
    {
      id: '3',
      title: 'Team meeting - Weekly sync',
      description: 'Weekly team synchronization meeting',
      type: 'Meeting',
      priority: 'Medium',
      status: 'Scheduled',
      startDate: new Date(2024, 0, 19, 9, 0),
      endDate: new Date(2024, 0, 19, 10, 0),
      allDay: false,
      location: 'Conference Room A',
      attendees: ['team@company.com'],
      assignedToId: '1',
      assignedToName: 'John Smith',
      createdById: '1',
      createdByName: 'John Smith',
      reminder: 10,
      recurring: 'Weekly',
      tags: ['team', 'meeting'],
      createdAt: new Date(2024, 0, 12),
      updatedAt: new Date(2024, 0, 12)
    },
    {
      id: '4',
      title: 'Send proposal to Global Industries',
      description: 'Prepare and send detailed proposal',
      type: 'Task',
      priority: 'High',
      status: 'In Progress',
      startDate: new Date(2024, 0, 21, 11, 0),
      endDate: new Date(2024, 0, 21, 12, 0),
      allDay: false,
      relatedToType: 'Deal',
      relatedToId: '3',
      relatedToName: 'Global Industries Deal',
      assignedToId: '3',
      assignedToName: 'Mike Davis',
      createdById: '3',
      createdByName: 'Mike Davis',
      reminder: 60,
      tags: ['proposal', 'urgent'],
      notes: 'Deadline is end of week',
      createdAt: new Date(2024, 0, 17),
      updatedAt: new Date(2024, 0, 18)
    }
  ]);

  const today = new Date();
  const todayEvents = events.filter(event => 
    event.startDate.toDateString() === today.toDateString()
  );

  const upcomingEvents = events.filter(event => 
    event.startDate > today && event.startDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  const stats = [
    { title: "Today's Tasks", value: todayEvents.length.toString(), icon: CalendarIcon, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'This Week', value: upcomingEvents.length.toString(), icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'High Priority', value: events.filter(e => e.priority === 'High' || e.priority === 'Urgent').length.toString(), icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { title: 'Completed', value: events.filter(e => e.status === 'Completed').length.toString(), icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
  ];

  const typeOptions = [
    { label: 'All Types', value: 'all' },
    { label: 'Meeting', value: 'Meeting' },
    { label: 'Call', value: 'Call' },
    { label: 'Task', value: 'Task' },
    { label: 'Demo', value: 'Demo' },
    { label: 'Follow-up', value: 'Follow-up' },
    { label: 'Reminder', value: 'Reminder' },
    { label: 'Other', value: 'Other' }
  ];

  const priorityOptions = [
    { label: 'All Priorities', value: 'all' },
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' }
  ];

  const viewOptions = [
    { label: 'Agenda', value: 'agenda' },
    { label: 'Month', value: 'month' },
    { label: 'Week', value: 'week' },
    { label: 'Day', value: 'day' }
  ];

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.relatedToName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesPriority = filterPriority === 'all' || event.priority === filterPriority;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const getTypeIcon = (type: Event['type']) => {
    const icons = {
      'Meeting': Users,
      'Call': Phone,
      'Task': CheckCircle,
      'Demo': Target,
      'Follow-up': Mail,
      'Reminder': AlertCircle,
      'Other': Clock
    };
    const Icon = icons[type];
    return <Icon className="w-4 h-4" />;
  };

  const getPriorityBadge = (priority: Event['priority']) => {
    const variants = {
      'Low': 'default' as const,
      'Medium': 'primary' as const,
      'High': 'warning' as const,
      'Urgent': 'danger' as const
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: Event['status']) => {
    const variants = {
      'Scheduled': 'primary' as const,
      'In Progress': 'warning' as const,
      'Completed': 'success' as const,
      'Cancelled': 'default' as const,
      'Rescheduled': 'secondary' as const
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const handleEdit = (event: Event) => {
    toast.info('Edit Event', {
      description: `Editing ${event.title}`,
    });
  };

  const handleDelete = (event: Event) => {
    toast('Delete Event', {
      description: `Are you sure you want to delete "${event.title}"?`,
      action: {
        label: 'Delete',
        onClick: () => {
          setEvents(prev => prev.filter(e => e.id !== event.id));
          toast.success('Event deleted successfully');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleStatusChange = (event: Event, newStatus: Event['status']) => {
    setEvents(prev => prev.map(e => 
      e.id === event.id 
        ? { ...e, status: newStatus, updatedAt: new Date() }
        : e
    ));
    toast.success('Event status updated', {
      description: `${event.title} marked as ${newStatus}`
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventActions = (event: Event) => (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      }
      options={[
        ...(event.status !== 'Completed' ? [{
          label: 'Mark Complete',
          value: 'complete',
          icon: <CheckCircle className="w-4 h-4" />,
        }] : []),
        ...(event.status === 'Scheduled' ? [{
          label: 'Mark In Progress',
          value: 'progress',
          icon: <Clock className="w-4 h-4" />,
        }] : []),
        {
          label: 'Edit',
          value: 'edit',
          icon: <Edit className="w-4 h-4" />,
        },
        {
          label: 'Reschedule',
          value: 'reschedule',
          icon: <CalendarIcon className="w-4 h-4" />,
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
          case 'complete':
            handleStatusChange(event, 'Completed');
            break;
          case 'progress':
            handleStatusChange(event, 'In Progress');
            break;
          case 'edit':
            handleEdit(event);
            break;
          case 'reschedule':
            handleStatusChange(event, 'Rescheduled');
            break;
          case 'delete':
            handleDelete(event);
            break;
        }
      }}
    />
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Calendar</h1>
          <p className="text-gray-600">Schedule and manage your tasks and activities</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Sync Calendar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Task
          </Button>
        </div>
      </div>

      {/* Stats */}
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

      {/* Controls */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Select
              options={viewOptions}
              value={view}
              onChange={(value) => setView(value as any)}
              placeholder="Select view"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select
              options={typeOptions}
              value={filterType}
              onChange={setFilterType}
              placeholder="Filter by type"
            />
            <Select
              options={priorityOptions}
              value={filterPriority}
              onChange={setFilterPriority}
              placeholder="Filter by priority"
            />
          </div>
        </div>
      </Card>

      {/* Calendar Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Calendar Area */}
        <div className="lg:col-span-3">
          <Card title="Scheduled Tasks & Events" subtitle={`${filteredEvents.length} events found`}>
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents
                  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                  .map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getTypeIcon(event.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">{event.title}</h3>
                              {getPriorityBadge(event.priority)}
                              {getStatusBadge(event.status)}
                            </div>
                            {event.description && (
                              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                            )}
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                {formatDate(event.startDate)}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {formatTime(event.startDate)} - {formatTime(event.endDate)}
                              </span>
                              {event.location && (
                                <span>{event.location}</span>
                              )}
                            </div>
                            {event.relatedToName && (
                              <div className="mt-2">
                                <Badge variant="secondary" className="text-xs">
                                  {event.relatedToType}: {event.relatedToName}
                                </Badge>
                              </div>
                            )}
                            {event.tags && event.tags.length > 0 && (
                              <div className="flex items-center space-x-1 mt-2">
                                {event.tags.map((tag, index) => (
                                  <Badge key={index} variant="default" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{event.assignedToName}</span>
                          {getEventActions(event)}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No scheduled tasks found</p>
                  <p className="text-sm">Create your first scheduled task to get started</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card title="Today's Schedule" subtitle={`${todayEvents.length} events`}>
            <div className="space-y-3">
              {todayEvents.length > 0 ? (
                todayEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                      </p>
                    </div>
                    {getPriorityBadge(event.priority)}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No events scheduled for today</p>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Button className="w-full" variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Task
              </Button>
              <Button className="w-full" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="w-full" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
              <Button className="w-full" variant="ghost">
                <CalendarIcon className="w-4 h-4 mr-2" />
                View All Tasks
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;