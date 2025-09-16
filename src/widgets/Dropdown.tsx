import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  position?: 'left' | 'right';
  className?: string;
}

/**
 * Flexible dropdown component with customizable trigger and options
 */
const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  options,
  onSelect,
  position = 'right',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    if (!option.disabled) {
      onSelect(option);
      setIsOpen(false);
    }
  };

  const positionClasses = position === 'left' ? 'left-0' : 'right-0';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className={`absolute ${positionClasses} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20`}>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={option.disabled}
                className={`
                  w-full flex items-center px-4 py-2 text-sm transition-colors text-left
                  ${option.disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : option.danger 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {option.icon && (
                  <span className="mr-3 flex-shrink-0">
                    {option.icon}
                  </span>
                )}
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;