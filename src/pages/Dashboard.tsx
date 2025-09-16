import React from 'react';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { Card, Button } from '../widgets';

/**
 * Dashboard page with clean Tailwind design
 */
const Dashboard: React.FC = () => {
  const metrics = [
    { title: 'Total Leads', value: '1,234', icon: TrendingUp, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { title: 'Active Contacts', value: '856', icon: Users, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Open Deals', value: '42', icon: Target, color: 'text-secondary-600', bgColor: 'bg-secondary-100' },
    { title: 'Revenue', value: '$125K', icon: DollarSign, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Button>Add New Lead</Button>
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card title="Recent Activity">
            <div className="space-y-4">
              {[
                { action: 'New lead from website contact form', time: '2 hours ago' },
                { action: 'Deal closed with Acme Corporation', time: '1 day ago' },
                { action: 'Follow-up call scheduled with Tech Solutions', time: '2 days ago' },
                { action: 'New contact added to database', time: '3 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
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
              <Button className="w-full" variant="primary">Add New Lead</Button>
              <Button className="w-full" variant="outline">Create Contact</Button>
              <Button className="w-full" variant="outline">Schedule Meeting</Button>
              <Button className="w-full" variant="ghost">View Reports</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;