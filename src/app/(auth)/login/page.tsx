import Link from 'next/link';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-fashion-cream to-white">
      {/* Header */}
      <header className="pt-6 px-6">
        <div className="container mx-auto max-w-6xl">
          <Link href="/" className="inline-block">
            <h1 className="font-serif font-bold text-xl text-fashion-burgundy">FashionAIKit</h1>
          </Link>
        </div>
      </header>

      {/* Login Card */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="card w-full max-w-md border border-fashion-gold/10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-fashion-navy mb-2">Welcome Back</h2>
            <div className="h-0.5 w-12 bg-fashion-gold mx-auto"></div>
          </div>
          
          <p className="text-center text-neutral-600 mb-8 elegant-spacing">
            Sign in to your account to access personalized fashion recommendations.
          </p>
          
          {/* Google Sign In Button */}
          <div className="mb-6">
            <GoogleSignInButton />
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-neutral-100">
            <p className="text-sm text-neutral-600">
              Don&apos;t have an account? Sign in with Google to create one automatically.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 px-6 text-center">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} FashionAIKit. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
