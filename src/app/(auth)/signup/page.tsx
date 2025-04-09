import Link from 'next/link';

export default function SignUpPage() {
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

      {/* Signup Card */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="card w-full max-w-md border border-fashion-gold/10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-fashion-navy mb-2">Create Your Account</h2>
            <div className="h-0.5 w-12 bg-fashion-gold mx-auto"></div>
          </div>
          
          <p className="text-center text-neutral-600 mb-8 elegant-spacing">
            Join FashionAIKit to discover your perfect style with AI-powered recommendations.
          </p>
          
          {/* Signup Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-fashion-charcoal mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-fashion-charcoal mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-fashion-charcoal mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-fashion-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-neutral-500">
                Password must be at least 8 characters long with a number and special character.
              </p>
            </div>
            
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-400 border-neutral-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-neutral-600">
                I agree to the <Link href="/terms" className="text-primary-600 hover:text-primary-800">Terms of Service</Link> and <Link href="/privacy" className="text-primary-600 hover:text-primary-800">Privacy Policy</Link>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full btn-fashion"
            >
              Create Account
            </button>
          </form>
          
          <div className="text-center mt-8 pt-6 border-t border-neutral-100">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-primary-600 hover:text-primary-800"
              >
                Sign in
              </Link>
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
