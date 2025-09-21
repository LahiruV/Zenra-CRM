import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Phone, Users, UserCheck } from 'lucide-react';
import { Button, Badge } from '../../widgets';
import { Event } from '../../model/Event';

interface CalendarGridProps {
  events: Event[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onCreateEvent: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  events,
  currentDate,
  onDateChange,
  onEventClick,
  onCreateEvent
}) => {
  const [view, setView] = useState<'month' | 'week'>('month');

  // Get first day of month and calculate calendar grid
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonth.getDate() - i),
      isCurrentMonth: false
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      isCurrentMonth: true
    });
  }
  
  // Next month days to fill grid
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day),
      isCurrentMonth: false
    });
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.startDate.toDateString() === date.toDateString()
    );
  };

  const getEventIcon = (type: Event['type']) => {
    const icons = {
      'Meeting': Users,
      'Call': Phone,
      'Task': Clock,
      'Follow-up': UserCheck,
      'Demo': Users,
      'Reminder': Clock,
      'Other': Clock
    };
    return icons[type] || Clock;
  };

  const getEventColor = (priority: Event['priority']) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-700 border-gray-200',
      'Medium': 'bg-blue-100 text-blue-700 border-blue-200',
      'High': 'bg-orange-100 text-orange-700 border-orange-200',
      'Urgent': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[priority];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Button 
              variant={view === 'month' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
            <Button 
              variant={view === 'week' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
          </div>
          <Button onClick={() => onCreateEvent(new Date())}>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-px mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDate(day.date);
            const isCurrentDay = isToday(day.date);
            
            return (
              <div
                key={index}
                className={`
                  min-h-[120px] bg-white p-2 cursor-pointer hover:bg-gray-50 transition-colors
                  ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
                  ${isCurrentDay ? 'bg-blue-50 border-2 border-blue-200' : ''}
                `}
                onClick={() => onCreateEvent(day.date)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`
                    text-sm font-medium
                    ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                    ${isCurrentDay ? 'text-blue-600 font-bold' : ''}
                  `}>
                    {day.date.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <Badge variant="primary" className="text-xs">
                      {dayEvents.length}
                    </Badge>
                  )}
                </div>

                {/* Events for this day */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <div
                        key={event.id}
                        className={`
                          text-xs p-1 rounded border cursor-pointer hover:shadow-sm transition-shadow
                          ${getEventColor(event.priority)}
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        <div className="flex items-center space-x-1">
                          <Icon className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate font-medium">{event.title}</span>
                        </div>
                        {!event.allDay && (
                          <div className="text-xs opacity-75 mt-0.5">
                            {formatTime(event.startDate)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;