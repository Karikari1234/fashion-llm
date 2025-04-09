import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-fashion-cream shadow-soft">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="font-serif font-bold text-xl text-fashion-burgundy">
          FashionAIKit
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-fashion-charcoal hover:text-fashion-burgundy transition-colors font-medium tracking-wide">
            Home
          </Link>
          <Link href="/dashboard" className="text-fashion-charcoal hover:text-fashion-burgundy transition-colors font-medium tracking-wide">
            Dashboard
          </Link>
          <Link href="/style-profile" className="text-fashion-charcoal hover:text-fashion-burgundy transition-colors font-medium tracking-wide">
            Style Profile
          </Link>
          <Link href="/virtual-try-on" className="text-fashion-charcoal hover:text-fashion-burgundy transition-colors font-medium tracking-wide">
            Virtual Try-On
          </Link>
        </nav>
        
        <div className="flex items-center space-x-6">
          <Link 
            href="/login" 
            className="text-sm font-medium text-fashion-charcoal hover:text-fashion-burgundy transition-colors tracking-wide"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="text-sm font-medium bg-fashion-burgundy text-white px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity tracking-wide"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
