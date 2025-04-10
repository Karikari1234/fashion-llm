'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SignOutButton from '@/components/auth/SignOutButton';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-fashion-navy">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="font-serif text-xl text-fashion-burgundy">FashionAIKit Dashboard</h1>
          <div className="flex items-center gap-4">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || 'User'} 
                className="w-10 h-10 rounded-full" 
              />
            ) : (
              <div className="w-10 h-10 bg-fashion-burgundy rounded-full flex items-center justify-center text-white">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <SignOutButton />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-serif mb-4">Welcome, {session?.user?.name || 'Fashion Enthusiast'}!</h2>
          <p className="text-neutral-600 mb-4">
            This is a protected route example. Only authenticated users can see this page.
          </p>
          <p>
            Your email: <span className="font-medium">{session?.user?.email}</span>
          </p>
          
          <div className="mt-8">
            <Link href="/" className="text-fashion-burgundy hover:underline">
              ← Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
