import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-soft">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-fashion-burgundy">
          FashionAIKit
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-neutral-700 hover:text-primary-600 transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-neutral-700 hover:text-primary-600 transition-colors">
            Dashboard
          </Link>
          <Link href="/style-profile" className="text-neutral-700 hover:text-primary-600 transition-colors">
            Style Profile
          </Link>
          <Link href="/virtual-try-on" className="text-neutral-700 hover:text-primary-600 transition-colors">
            Virtual Try-On
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
