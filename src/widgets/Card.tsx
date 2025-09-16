import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

/**
 * Flexible card component with customizable padding, shadows, and hover effects
 */
const Card: React.FC<CardProps> = ({ 
  title, 
  subtitle,
  children, 
  actions, 
  className = '',
  padding = 'md',
  shadow = 'sm',
  hover = false
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  const hoverClass = hover ? 'hover:shadow-md transition-shadow duration-200' : '';

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${shadowClasses[shadow]} ${hoverClass} ${className}`}>
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
      
      <div className={paddingClasses[padding]}>
        {children}
      </div>

      {actions && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;