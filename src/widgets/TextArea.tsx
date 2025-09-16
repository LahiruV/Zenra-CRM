import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * Enhanced textarea component with label and error states
 */
const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  resize = 'vertical',
  className = '',
  ...props
}) => {
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  const textareaClasses = `
    block px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
    ${error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
    }
    ${fullWidth ? 'w-full' : ''}
    ${props.disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
    ${resizeClasses[resize]}
  `;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <textarea
        className={`${textareaClasses} ${className}`}
        rows={4}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default TextArea;