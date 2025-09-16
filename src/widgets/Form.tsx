import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  loading?: boolean;
}

/**
 * Form wrapper component with title, subtitle, and action buttons
 */
const Form: React.FC<FormProps> = ({
  children,
  title,
  subtitle,
  actions,
  loading = false,
  className = '',
  ...props
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}

      <form className={`p-6 ${className}`} {...props}>
        <fieldset disabled={loading} className="space-y-4">
          {children}
        </fieldset>
      </form>

      {actions && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Form;