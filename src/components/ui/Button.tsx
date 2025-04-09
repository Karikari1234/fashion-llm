import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'fashion' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-12 px-5 text-sm',
    lg: 'h-14 px-6 text-base',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-400',
    secondary: 'bg-neutral-100 text-neutral-800 border border-neutral-300 hover:bg-neutral-200 focus:ring-neutral-300',
    fashion: 'bg-fashion-burgundy text-white hover:opacity-90 focus:ring-fashion-burgundy/30',
    gold: 'bg-fashion-gold text-fashion-navy hover:opacity-90 focus:ring-fashion-gold/30',
    outline: 'bg-transparent text-fashion-navy border border-fashion-navy hover:bg-fashion-navy/5 focus:ring-fashion-navy/20',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className}`;
  
  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
