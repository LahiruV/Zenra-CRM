import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top navigation bar */}
        <Topbar onMenuClick={toggleSidebar} />
        
        {/* Page content using Outlet */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;