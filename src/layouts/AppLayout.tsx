import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import BreadcrumbArea from '../components/BreadcrumbArea';

/**
 * Main application layout component
 * Uses Outlet for nested routing and manages sidebar state
 */
const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navigation bar */}
        <Topbar onMenuClick={toggleSidebar} />
        
        {/* Breadcrumb area - fixed, non-scrollable */}
        <BreadcrumbArea />
        
        {/* Page content using Outlet */}
        <main className="flex-1 px-6 py-6 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;