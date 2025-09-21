import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Filter, Search, Bell, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button, Input, Select } from '../widgets';
import { Event, CreateEventInput } from '../model/Event';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import EventModal from '../components/Calendar/EventModal';

/**
 * Big Calendar View Scheduler with Tasks and Reminders
 */
const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Mock events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync meeting',
      type: 'Meeting',
      priority: 'Medium',
      status: 'Scheduled',
      startDate: new Date(2024, 0, 22, 10, 0),
      endDate: new Date(2024, 0, 22, 11, 0),
      allDay: false,
      location: 'Conference Room A',
      attendees: ['team@company.com'],
      assignedToId: '1',
      assignedToName: 'John Smith',
      createdById: '1',
      createdByName: 'John Smith',
      reminder: 15,
      recurring: 'Weekly',
      tags: ['team', 'meeting'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Client Call - Acme Corp',
      description: 'Follow up call with Acme Corp about proposal',
      type: 'Call',
      priority: 'High',
      status: 'Scheduled',
      startDate: new Date(2024, 0, 23, 14, 0),
      endDate: new Date(2024, 0, 23, 14, 30),
      allDay: false,
      relatedToType: 'Account',
      relatedToId: '1',
      relatedToName: 'Acme Corporation',
      assignedToId: '1',
      assignedToName: 'John Smith',
      createdById: '1',
      createdByName: 'John Smith',
      reminder: 30,
      tags: ['client', 'follow-up'],
      notes: 'Discuss pricing and timeline',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Product Demo',
      description: 'Product demonstration for potential client',
      type: 'Demo',
      priority: 'High',
      status: 'Scheduled',
      startDate: new Date(2024, 0, 24, 15, 0),
      endDate: new Date(2024, 0, 24, 16, 0),
      allDay: false,
      location: 'Zoom Meeting',
      attendees: ['prospect@company.com'],
      relatedToType: 'Lead',
      relatedToId: '2',
      relatedToName: 'Tech Solutions Inc',
      assignedToId: '2',
      assignedToName: 'Sarah Johnson',
      createdById: '2',
      createdByName: 'Sarah Johnson',
      reminder: 60,
      tags: ['demo', 'sales'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      title: 'Submit Monthly Report',
      description: 'Complete and submit monthly sales report',
      type: 'Task',
      priority: 'Medium',
      status: 'Scheduled',
      startDate: new Date(2024, 0, 25, 9, 0),
      endDate: new Date(2024, 0, 25, 10, 0),
      allDay: false,
      assignedToId: '1',
      assignedToName: 'John Smith',
      createdById: '1',
      createdByName: 'John Smith',
      reminder: 1440, // 1 day before
      tags: ['report', 'deadline'],
      notes: 'Include Q4 performance metrics',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      title: 'Follow up with Global Industries',
      description: 'Check on proposal status and next steps',
      type: 'Follow-up',
      priority: 'High',
      status: 'Scheduled',
      startDate: new Date(2024, 0, 26, 11, 0),
      endDate: new Date(2024, 0, 26, 11, 30),
      allDay: false,
      relatedToType: 'Deal',
      relatedToId: '3',
      relatedToName: 'Global Industries Deal',
      assignedToId: '3',
      assignedToName: 'Mike Davis',
      createdById: '3',
      createdByName: 'Mike Davis',
      reminder: 15,
      tags: ['follow-up', 'proposal'],
      createdAt: new Date(),
      updatedAt: new Date()
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
    { title: "Today's Events", value: todayEvents.length.toString(), icon: CalendarIcon, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'This Week', value: upcomingEvents.length.toString(), icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'High Priority', value: events.filter(e => e.priority === 'High' || e.priority === 'Urgent').length.toString(), icon: Bell, color: 'text-red-600', bgColor: 'bg-red-100' },
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

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.relatedToName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesPriority = filterPriority === 'all' || event.priority === filterPriority;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const handleCreateEvent = (date?: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData: CreateEventInput) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { 
              ...event, 
              ...eventData,
              updatedAt: new Date()
            }
          : event
      ));
      toast.success('Event updated successfully');
    } else {
      // Create new event
      const newEvent: Event = {
        id: Date.now().toString(),
        ...eventData,
        status: 'Scheduled',
        assignedToName: 'John Smith', // Mock user
        createdById: '1',
        createdByName: 'John Smith',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setEvents(prev => [...prev, newEvent]);
      toast.success('Event created successfully');
    }
  };

  const handleCloseModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar Scheduler</h1>
          <p className="text-gray-600">Manage your tasks, meetings, and reminders</p>
        </div>
        <Button onClick={() => handleCreateEvent()}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
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

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
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
          </div>
          
          <div className="flex items-center space-x-4">
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

      {/* Big Calendar Grid */}
      <CalendarGrid
        events={filteredEvents}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onEventClick={handleEventClick}
        onCreateEvent={handleCreateEvent}
      />

      {/* Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;