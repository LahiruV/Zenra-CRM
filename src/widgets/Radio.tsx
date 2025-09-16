import React from 'react';

interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  direction?: 'horizontal' | 'vertical';
}

/**
 * Radio group component with multiple options
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  error,
  direction = 'vertical'
}) => {
  const containerClasses = direction === 'horizontal' 
    ? 'flex flex-wrap gap-6' 
    : 'space-y-3';

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      
      <div className={containerClasses}>
        {options.map((option) => (
          <div key={option.value} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                disabled={option.disabled}
                className={`
                  w-4 h-4 border-2 rounded-full transition-all duration-200 cursor-pointer
                  ${value === option.value 
                    ? 'border-primary-600 bg-primary-600' 
                    : error 
                      ? 'border-red-300 bg-white' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              />
              {value === option.value && (
                <div className="absolute w-2 h-2 bg-white rounded-full transform translate-x-1 translate-y-1" />
              )}
            </div>
            
            <div className="ml-3">
              <label className={`text-sm font-medium cursor-pointer ${
                error ? 'text-red-600' : option.disabled ? 'text-gray-400' : 'text-gray-900'
              }`}>
                {option.label}
              </label>
              {option.description && (
                <p className="text-sm text-gray-500">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default RadioGroup;