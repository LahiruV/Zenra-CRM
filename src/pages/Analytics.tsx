import React from 'react';
import { TrendingUp, Users, DollarSign, Target, Calendar, BarChart3, PieChart, Activity } from 'lucide-react';
import { Card, Button } from '../widgets';

/**
 * Analytics page with comprehensive CRM reporting and dashboards
 */
const Analytics: React.FC = () => {
  // Mock data for analytics
  const salesMetrics = [
    { title: 'Total Revenue', value: '$1.2M', change: '+12%', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'New Customers', value: '156', change: '+8%', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Conversion Rate', value: '24%', change: '+3%', icon: Target, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { title: 'Avg Deal Size', value: '$7.8K', change: '+15%', icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 85000, deals: 12, leads: 45 },
    { month: 'Feb', revenue: 92000, deals: 15, leads: 52 },
    { month: 'Mar', revenue: 78000, deals: 10, leads: 38 },
    { month: 'Apr', revenue: 105000, deals: 18, leads: 61 },
    { month: 'May', revenue: 118000, deals: 22, leads: 58 },
    { month: 'Jun', revenue: 134000, deals: 25, leads: 67 },
  ];

  const leadSources = [
    { source: 'Website', count: 145, percentage: 35 },
    { source: 'Referrals', count: 98, percentage: 24 },
    { source: 'Social Media', count: 76, percentage: 18 },
    { source: 'Email Campaign', count: 54, percentage: 13 },
    { source: 'Cold Calls', count: 41, percentage: 10 },
  ];

  const topPerformers = [
    { name: 'John Smith', deals: 28, revenue: 245000, conversion: 32 },
    { name: 'Sarah Johnson', deals: 24, revenue: 198000, conversion: 28 },
    { name: 'Mike Davis', deals: 19, revenue: 167000, conversion: 25 },
    { name: 'Emily Brown', deals: 16, revenue: 134000, conversion: 22 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive insights into your CRM performance</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className={`text-sm font-medium ${metric.color}`}>{metric.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card title="Revenue Trend" subtitle="Monthly revenue performance">
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 140000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${(data.revenue / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Lead Sources */}
        <Card title="Lead Sources" subtitle="Where your leads are coming from">
          <div className="space-y-4">
            {leadSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-20 text-sm font-medium text-gray-900">{source.source}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-secondary-600 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {source.count} ({source.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card title="Top Performers" subtitle="Sales team performance this month">
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{performer.name}</div>
                    <div className="text-sm text-gray-500">{performer.deals} deals closed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">${(performer.revenue / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-500">{performer.conversion}% conversion</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity" subtitle="Latest CRM activities">
          <div className="space-y-4">
            {[
              { action: 'Deal closed with Acme Corp', value: '$150K', time: '2 hours ago', type: 'deal' },
              { action: 'New lead from website form', value: 'Tech Solutions', time: '4 hours ago', type: 'lead' },
              { action: 'Meeting scheduled with Global Industries', value: 'Tomorrow 2PM', time: '6 hours ago', type: 'meeting' },
              { action: 'Support ticket resolved', value: 'Ticket #1234', time: '1 day ago', type: 'support' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'deal' ? 'bg-green-100' :
                    activity.type === 'lead' ? 'bg-blue-100' :
                    activity.type === 'meeting' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <Activity className={`w-4 h-4 ${
                      activity.type === 'deal' ? 'text-green-600' :
                      activity.type === 'lead' ? 'text-blue-600' :
                      activity.type === 'meeting' ? 'text-purple-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {activity.value}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Reports */}
      <Card title="Quick Reports" subtitle="Generate common reports instantly">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Sales Forecast', description: 'Projected revenue for next quarter', icon: TrendingUp },
            { title: 'Lead Conversion', description: 'Lead to customer conversion analysis', icon: Target },
            { title: 'Customer Retention', description: 'Customer churn and retention metrics', icon: Users },
            { title: 'Pipeline Analysis', description: 'Sales pipeline health report', icon: BarChart3 },
          ].map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Generate Report
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;