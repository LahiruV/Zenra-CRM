import React from 'react';
import { TrendingUp, Phone, Mail } from 'lucide-react';
import { Card, Button } from '../widgets';

/**
 * Leads page with clean design
 */
const Leads: React.FC = () => {
  const sampleLeads = [
    { 
      id: 1, 
      name: 'Acme Corporation', 
      contact: 'John Smith', 
      email: 'john@acme.com', 
      status: 'Hot',
      value: '$15,000'
    },
    { 
      id: 2, 
      name: 'Tech Solutions Inc', 
      contact: 'Sarah Johnson', 
      email: 'sarah@techsolutions.com', 
      status: 'Warm',
      value: '$8,500'
    },
    { 
      id: 3, 
      name: 'Global Industries', 
      contact: 'Mike Davis', 
      email: 'mike@global.com', 
      status: 'Cold',
      value: '$22,000'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Warm': return 'bg-yellow-100 text-yellow-800';
      case 'Cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
        <Button>Add New Lead</Button>
      </div>

      {/* Leads Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Hot Leads</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">45</p>
              <p className="text-sm text-gray-600">Warm Leads</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">67</p>
              <p className="text-sm text-gray-600">Cold Leads</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leads List */}
      <Card title="Recent Leads">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLeads.map((lead) => (
            <div key={lead.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Contact: {lead.contact}</p>
              <p className="text-sm text-gray-600 mb-1">Email: {lead.email}</p>
              <p className="text-lg font-semibold text-primary-600 mb-3">{lead.value}</p>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Leads;