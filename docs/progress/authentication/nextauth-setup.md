# NextAuth v5 Setup Guide for FashionAIKit

This document provides comprehensive documentation on how authentication is implemented in the FashionAIKit project using NextAuth v5 (Auth.js).

## Overview

FashionAIKit uses NextAuth v5 for authentication, with Google as the primary authentication provider. The implementation follows the latest App Router pattern in Next.js, leveraging the powerful features of NextAuth v5 beta.

## Authentication Architecture

The authentication system is built around the following key files:

- `auth.js` - The main configuration file for NextAuth
- `auth.config.js` - Shared authentication configuration
- `middleware.js` - Middleware for protecting routes
- `app/api/auth/[...nextauth]/route.js` - API routes for authentication
- `components/auth/*` - Authentication-related components
- `app/(auth)/*` - Authentication-related pages

### 1. Root Configuration Files

#### auth.config.js

This file contains the base configuration for NextAuth, including auth pages, callbacks, and authorization logic:

```javascript
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute = nextUrl.pathname.startsWith('/dashboard');

      if (isOnProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Will be filled in the auth.js file
};
```

#### auth.js

This file extends the base configuration and implements the authentication provider:

```javascript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
});
```

#### middleware.js

This file implements the middleware that protects routes based on authentication status:

```javascript
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
```

### 2. API Route Handler

#### app/api/auth/[...nextauth]/route.js

This file handles the NextAuth API routes, exporting the GET and POST handlers from auth.js:

```javascript
import { handlers } from '../../../../../auth';

export const { GET, POST } = handlers;
```

## Authentication Flow

### Sign In Flow

1. User navigates to `/login`
2. User clicks "Sign in with Google" button
3. User is redirected to Google's authentication page
4. After successful authentication, Google redirects back to `/api/auth/callback/google`
5. NextAuth processes the callback and sets up the session
6. User is redirected to `/dashboard`

### Authentication Verification

- Server-side: Using the `auth()` function in server components
- Client-side: Using the `useSession()` hook in client components
- Middleware: Using the NextAuth middleware for route protection

## Implementation in Components

### Server Components

For server components, the `auth()` function is used to check authentication:

```javascript
import { auth } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    // Handle unauthenticated state
    return <p>Please log in to view this page</p>;
  }
  
  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      {/* Rest of the component */}
    </div>
  );
}
```

### Client Components

For client components, the `useSession()` hook from `next-auth/react` is used:

```javascript
'use client';

import { useSession } from 'next-auth/react';

export default function ProfileButton() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  
  if (!session) {
    return <p>Not signed in</p>;
  }
  
  return (
    <button>
      {session.user.name}'s Profile
    </button>
  );
}
```

### Session Provider

To use the `useSession` hook, the application must be wrapped with the SessionProvider:

```javascript
// In a layout or root component
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```

## Sign Out Implementation

The sign-out functionality is implemented using server actions:

```javascript
'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })}>
      Sign Out
    </button>
  );
}
```

## Environment Variables

The following environment variables are required for authentication:

```
# .env.local

# Required for NextAuth
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your-secret-key

# Google Provider
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Troubleshooting Common Issues

### 405 Method Not Allowed Errors

If you see 405 Method Not Allowed errors for routes like `/api/auth/session`, it may be due to:

1. **Missing or incorrect API route handler**: Ensure your `[...nextauth]/route.js` file correctly exports `GET` and `POST` handlers from the auth handlers:

   ```javascript
   import { handlers } from '../../../../../auth';
   export const { GET, POST } = handlers;
   ```

2. **Mismatched NextAuth export**: Make sure your `auth.js` exports the `handlers` property:

   ```javascript
   export const { handlers, auth, signIn, signOut } = NextAuth({
     // config
   });
   ```

3. **Incorrect path to auth.js**: Check that the import path in your API route is correct.

### Session Not Persisting

If the session is not persisting or user keeps getting logged out:

1. Ensure `AUTH_SECRET` is properly set in your environment variables
2. Check that your database connection is working (if using database session strategy)
3. Verify that cookies are being set correctly

## Security Considerations

1. **Environment Variables**: Never commit sensitive environment variables to your repository
2. **CSRF Protection**: NextAuth includes CSRF protection by default
3. **Authentication Tokens**: JWT tokens are encrypted and signed with your AUTH_SECRET
4. **Rate Limiting**: Consider implementing rate limiting for authentication endpoints

## Resources

- [NextAuth v5 Documentation](https://authjs.dev)
- [NextAuth v5 Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [Next.js Authentication Documentation](https://nextjs.org/docs/authentication)
