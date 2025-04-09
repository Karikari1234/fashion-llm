import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  simplifiedFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  hideFooter = false,
  simplifiedFooter = false
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!hideFooter && <Footer simplified={simplifiedFooter} />}
    </div>
  );
};

export default MainLayout;
