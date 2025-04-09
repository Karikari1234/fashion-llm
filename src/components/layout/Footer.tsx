import React from 'react';
import Link from 'next/link';

interface FooterProps {
  simplified?: boolean;
}

const Footer: React.FC<FooterProps> = ({ simplified = false }) => {
  if (simplified) {
    return (
      <footer className="py-6 px-6 text-center">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} FashionAIKit. All rights reserved.
        </p>
      </footer>
    );
  }

  return (
    <footer className="bg-fashion-navy text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-serif font-bold mb-5">FashionAIKit</h3>
            <p className="text-neutral-300 elegant-spacing">
              Your AI-powered fashion assistant for personalized style recommendations.
            </p>
          </div>
          <div>
            <h4 className="text-md font-bold mb-5 text-fashion-cream">Features</h4>
            <ul className="space-y-3">
              <li><Link href="/style-analysis" className="text-neutral-300 hover:text-fashion-gold transition-colors">Style Analysis</Link></li>
              <li><Link href="/recommendations" className="text-neutral-300 hover:text-fashion-gold transition-colors">AI Recommendations</Link></li>
              <li><Link href="/virtual-try-on" className="text-neutral-300 hover:text-fashion-gold transition-colors">Virtual Try-On</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-bold mb-5 text-fashion-cream">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-neutral-300 hover:text-fashion-gold transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-neutral-300 hover:text-fashion-gold transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-neutral-300 hover:text-fashion-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-bold mb-5 text-fashion-cream">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-neutral-300 hover:text-fashion-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-neutral-300 hover:text-fashion-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-fashion-navy/40 mt-10 pt-8 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} FashionAIKit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
