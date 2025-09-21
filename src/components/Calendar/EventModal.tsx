import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, Users, Tag, Bell } from 'lucide-react';
import { Modal, Button, Input, TextArea, Select } from '../../widgets';
import { Event, CreateEventInput } from '../../model/Event';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: CreateEventInput) => void;
  event?: Event | null;
  selectedDate?: Date;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  event,
  selectedDate
}) => {
  const [formData, setFormData] = useState<CreateEventInput>({
    title: '',
    description: '',
    type: 'Task',
    priority: 'Medium',
    startDate: selectedDate || new Date(),
    endDate: selectedDate || new Date(),
    allDay: false,
    location: '',
    attendees: [],
    assignedToId: '1',
    reminder: 15,
    recurring: 'None',
    tags: [],
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        type: event.type,
        priority: event.priority,
        startDate: event.startDate,
        endDate: event.endDate,
        allDay: event.allDay,
        location: event.location || '',
        attendees: event.attendees || [],
        assignedToId: event.assignedToId,
        reminder: event.reminder || 15,
        recurring: event.recurring || 'None',
        tags: event.tags || [],
        notes: event.notes || ''
      });
    } else if (selectedDate) {
      const endDate = new Date(selectedDate);
      endDate.setHours(endDate.getHours() + 1);
      
      setFormData(prev => ({
        ...prev,
        startDate: selectedDate,
        endDate: endDate
      }));
    }
  }, [event, selectedDate]);

  const typeOptions = [
    { label: 'Task', value: 'Task' },
    { label: 'Meeting', value: 'Meeting' },
    { label: 'Call', value: 'Call' },
    { label: 'Follow-up', value: 'Follow-up' },
    { label: 'Demo', value: 'Demo' },
    { label: 'Reminder', value: 'Reminder' },
    { label: 'Other', value: 'Other' }
  ];

  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' }
  ];

  const reminderOptions = [
    { label: 'No reminder', value: 0 },
    { label: '5 minutes before', value: 5 },
    { label: '15 minutes before', value: 15 },
    { label: '30 minutes before', value: 30 },
    { label: '1 hour before', value: 60 },
    { label: '1 day before', value: 1440 }
  ];

  const recurringOptions = [
    { label: 'Does not repeat', value: 'None' },
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Yearly', value: 'Yearly' }
  ];

  const handleInputChange = (field: keyof CreateEventInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.startDate >= formData.endDate) {
      newErrors.endDate = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(formData);
    onClose();
  };

  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Edit Event' : 'Create New Event'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <Input
            label="Title *"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={errors.title}
            placeholder="Enter event title"
            fullWidth
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Type"
              options={typeOptions}
              value={formData.type}
              onChange={(value) => handleInputChange('type', value as CreateEventInput['type'])}
              fullWidth
            />
            <Select
              label="Priority"
              options={priorityOptions}
              value={formData.priority}
              onChange={(value) => handleInputChange('priority', value as CreateEventInput['priority'])}
              fullWidth
            />
          </div>

          <TextArea
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter event description"
            rows={3}
            fullWidth
          />
        </div>

        {/* Date and Time */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Date & Time
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date & Time"
              type="datetime-local"
              value={formatDateTimeLocal(formData.startDate)}
              onChange={(e) => handleInputChange('startDate', new Date(e.target.value))}
              fullWidth
            />
            <Input
              label="End Date & Time"
              type="datetime-local"
              value={formatDateTimeLocal(formData.endDate)}
              onChange={(e) => handleInputChange('endDate', new Date(e.target.value))}
              error={errors.endDate}
              fullWidth
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.allDay}
                onChange={(e) => handleInputChange('allDay', e.target.checked)}
                className="mr-2"
              />
              All day event
            </label>
          </div>
        </div>

        {/* Location and Attendees */}
        <div className="space-y-4">
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Enter location or meeting link"
            leftIcon={<MapPin className="w-4 h-4" />}
            fullWidth
          />

          <Input
            label="Attendees"
            value={formData.attendees?.join(', ') || ''}
            onChange={(e) => handleInputChange('attendees', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="Enter email addresses separated by commas"
            leftIcon={<Users className="w-4 h-4" />}
            fullWidth
          />
        </div>

        {/* Reminders and Recurrence */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Reminders & Recurrence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Reminder"
              options={reminderOptions}
              value={formData.reminder}
              onChange={(value) => handleInputChange('reminder', Number(value))}
              fullWidth
            />
            <Select
              label="Repeat"
              options={recurringOptions}
              value={formData.recurring}
              onChange={(value) => handleInputChange('recurring', value as CreateEventInput['recurring'])}
              fullWidth
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <TextArea
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Add any additional notes"
            rows={3}
            fullWidth
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EventModal;