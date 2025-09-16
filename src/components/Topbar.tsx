import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { authService } from '../functions/authService';

interface TopbarProps {
  onMenuClick: () => void;
}

/**
 * Clean topbar component with Tailwind styling
 */
const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    setDropdownOpen(false);
    
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      dispatch(logout());
      navigate('/login');
    }
  };

  const handleSettings = () => {
    navigate('/settings');
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-2 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* App title - hidden on mobile */}
        <h1 className="hidden sm:block text-base font-semibold text-gray-800">
          CRM Dashboard
        </h1>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* User info */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || 'John Doe'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role || 'Sales Manager'}
              </p>
            </div>
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setDropdownOpen(false)}
              />
              
              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <button
                  onClick={handleSettings}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </button>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;