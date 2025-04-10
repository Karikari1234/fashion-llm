'use client';

import { signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';

interface SignOutButtonProps {
  variant?: 'primary' | 'secondary' | 'fashion' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function SignOutButton({ 
  variant = 'outline', 
  size = 'sm' 
}: SignOutButtonProps) {
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sign Out
    </Button>
  );
}
