import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * Custom select component with search functionality
 */
const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  error,
  helperText,
  fullWidth = false,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedOption = options.find(option => option.value === value);
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-400' : 'bg-white text-gray-900'}
          `}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && !disabled && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 text-left transition-colors
                        ${option.disabled 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-900 hover:bg-gray-50'
                        }
                        ${value === option.value ? 'bg-blue-50 text-blue-600' : ''}
                        ${value === option.value ? 'bg-primary-50 text-primary-600' : ''}
                      `}
                    >
                      {option.label}
                      {value === option.value && (
                        <Check className="w-4 h-4 text-primary-600" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 text-center">
                    No options found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;