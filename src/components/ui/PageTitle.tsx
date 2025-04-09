import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  withDecoration?: boolean;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  subtitle, 
  centered = false, 
  withDecoration = false,
  className = '' 
}) => {
  const containerClasses = `mb-8 ${centered ? 'text-center' : ''} ${className}`;
  
  return (
    <div className={containerClasses}>
      {/* Optional eyebrow text for hierarchy */}
      {subtitle && (
        <span className="text-fashion-burgundy text-sm uppercase tracking-wider font-medium mb-3 block">
          {subtitle}
        </span>
      )}
      
      {/* Main title */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-fashion-navy">
        {title}
      </h1>
      
      {/* Optional decorative element */}
      {withDecoration && centered && (
        <div className="h-0.5 w-20 bg-fashion-gold mx-auto mt-6"></div>
      )}
      
      {/* Optional decorative element for left-aligned titles */}
      {withDecoration && !centered && (
        <div className="h-0.5 w-20 bg-fashion-gold mt-6"></div>
      )}
    </div>
  );
};

export default PageTitle;
