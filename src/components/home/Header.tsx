import Link from 'next/link';

export default function HomeHeader() {
  return (
    <header className="bg-fashion-cream shadow-soft">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="font-serif font-bold text-xl text-fashion-burgundy">FashionAIKit</h1>
        
        <div className="flex items-center space-x-6">
          <Link 
            href="/login" 
            className="text-sm font-medium text-fashion-charcoal hover:text-primary-600 transition-colors tracking-wide"
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
}
