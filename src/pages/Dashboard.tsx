import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, DollarSign, Target, CheckSquare, Building, HeadphonesIcon, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Card, Button } from '../widgets';

/**
 * Dashboard page with clean Tailwind design
 */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    { title: 'Total Leads', value: '1,234', icon: TrendingUp, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'Active Contacts', value: '856', icon: Users, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Active Accounts', value: '234', icon: Building, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Revenue', value: '$125K', icon: DollarSign, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-lead':
        navigate('/leads/add');
        break;
      case 'create-contact':
        navigate('/contacts/add');
        break;
      case 'create-task':
        navigate('/tasks/add');
        break;
      case 'schedule-event':
        navigate('/calendar');
        toast.info('Calendar opened', {
          description: 'Click on any date to schedule a new event'
        });
        break;
      case 'add-account':
        navigate('/accounts/add');
        break;
      case 'view-analytics':
        navigate('/analytics');
        break;
      default:
        toast.info('Feature coming soon!');
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Button onClick={() => handleQuickAction('add-lead')}>Add New Lead</Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-sm text-gray-600">Open Deals</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full mr-4">
              <CheckSquare className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="text-sm text-gray-600">Pending Tasks</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <HeadphonesIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-600">Open Tickets</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-teal-100 rounded-full mr-4">
              <Calendar className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Today's Meetings</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card title="Recent Activity">
            <div className="space-y-4">
              {[
                { action: 'Deal closed with Acme Corporation - $150K', time: '2 hours ago', type: 'deal' },
                { action: 'New lead from website contact form', time: '4 hours ago', type: 'lead' },
                { action: 'Support ticket resolved for Global Industries', time: '6 hours ago', type: 'support' },
                { action: 'Follow-up call scheduled with Tech Solutions', time: '1 day ago', type: 'task' },
                { action: 'New account created: Startup Inc', time: '2 days ago', type: 'account' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'deal' ? 'bg-green-500' :
                      activity.type === 'lead' ? 'bg-blue-500' :
                      activity.type === 'support' ? 'bg-red-500' :
                      activity.type === 'task' ? 'bg-purple-500' : 'bg-gray-500'
                    }`} />
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Button 
                className="w-full" 
                variant="primary"
                onClick={() => handleQuickAction('add-lead')}
              >
                Add New Lead
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('create-contact')}
              >
                Create Contact
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('create-task')}
              >
                Create Task
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('schedule-event')}
              >
                Schedule Event
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('add-account')}
              >
                Add Account
              </Button>
              <Button 
                className="w-full" 
                variant="ghost"
                onClick={() => handleQuickAction('view-analytics')}
              >
                View Analytics
              </Button>
            </div>
          </Card>
          
          {/* Today's Tasks */}
          <Card title="Today's Tasks" className="mt-6">
            <div className="space-y-3">
              {[
                { task: 'Call Acme Corp about renewal', time: '10:00 AM', priority: 'high' },
                { task: 'Demo for Tech Solutions', time: '2:00 PM', priority: 'medium' },
                { task: 'Follow up with Global Industries', time: '4:00 PM', priority: 'low' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => handleQuickAction('create-task')}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500' :
                      item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <span className="text-sm text-gray-900">{item.task}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;