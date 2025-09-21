import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Building,
  CheckSquare,
  Target,
  HeadphonesIcon,
  BarChart3,
  Calendar,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

/**
 * Sidebar navigation component with clean Tailwind design
 */
const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { text: 'Leads', icon: TrendingUp, path: '/leads' },
    { text: 'Contacts', icon: Users, path: '/contacts' },
    { text: 'Accounts', icon: Building, path: '/accounts' },
    { text: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { text: 'Deals', icon: Target, path: '/deals' },
    { text: 'Support', icon: HeadphonesIcon, path: '/support' },
    { text: 'Scheduler', icon: Calendar, path: '/calendar' },
    { text: 'Analytics', icon: BarChart3, path: '/analytics' },
    { text: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`
        hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex-shrink-0
        ${open ? 'w-64' : 'w-16'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          {open && (
            <h1 className="text-base font-semibold text-gray-800">CRM System</h1>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.text}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                      ${!open ? 'justify-center' : 'justify-start'}
                    `}
                  >
                    <Icon className={`w-5 h-5 ${open ? 'mr-3' : ''}`} />
                    {open && (
                      <span className="font-medium">{item.text}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onToggle} />
          <div className="relative flex flex-col w-64 bg-white border-r border-gray-200 h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <h1 className="text-base font-semibold text-gray-800">CRM System</h1>
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <li key={item.text}>
                      <button
                        onClick={() => {
                          handleNavigation(item.path);
                          onToggle();
                        }}
                        className={`
                          w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;