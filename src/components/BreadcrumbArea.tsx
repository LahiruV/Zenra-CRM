import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

/**
 * Fixed breadcrumb area component that shows current page navigation
 */
const BreadcrumbArea: React.FC = () => {
  const location = useLocation();

  // Generate breadcrumb items based on current route
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);

    // Handle root/dashboard
    if (path === '/' || path === '/dashboard') {
      return [{ label: 'Dashboard', current: true }];
    }

    const items = [];

    // Handle different routes
    if (segments[0] === 'contacts') {
      items.push({ label: 'Contacts', path: '/contacts' });
      
      if (segments[1] === 'add') {
        items.push({ label: 'Add Contact', current: true });
      } else if (segments[1] === 'edit' && segments[2]) {
        items.push({ label: 'Edit Contact', current: true });
      } else if (segments.length === 1) {
        items[0].current = true;
      }
    } else if (segments[0] === 'leads') {
      items.push({ label: 'Leads', current: true });
    } else if (segments[0] === 'settings') {
      items.push({ label: 'Settings', current: true });
    } else {
      // Default fallback
      const pageName = segments[0]?.charAt(0).toUpperCase() + segments[0]?.slice(1) || 'Dashboard';
      items.push({ label: pageName, current: true });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default BreadcrumbArea;