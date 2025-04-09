import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'cream' | 'elevated' | 'bordered';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  // Base card classes
  const baseClasses = 'rounded-lg';
  
  // Variant-specific classes
  const variantClasses = {
    default: 'bg-white shadow-soft p-8',
    cream: 'bg-fashion-cream shadow-soft p-8',
    elevated: 'bg-white shadow-strong p-8',
    bordered: 'bg-white border border-fashion-gold/20 shadow-soft p-8',
  };
  
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;
