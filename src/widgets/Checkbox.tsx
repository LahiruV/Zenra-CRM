import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

/**
 * Custom checkbox component with label and description
 */
const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            {...props}
          />
          <div className={`
            w-4 h-4 border-2 rounded transition-all duration-200 cursor-pointer
            ${props.checked 
              ? 'bg-primary-600 border-primary-600' 
              : error 
                ? 'border-red-300 bg-white' 
                : 'border-gray-300 bg-white hover:border-gray-400'
            }
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}>
            {props.checked && (
              <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5 transform -translate-x-0.5 -translate-y-0.5" />
            )}
          </div>
        </div>
      </div>
      
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <label className={`text-sm font-medium cursor-pointer ${error ? 'text-red-600' : 'text-gray-900'}`}>
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;