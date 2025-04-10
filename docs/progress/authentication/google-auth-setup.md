# Google Authentication Setup for FashionAIKit

This guide walks you through the process of setting up Google OAuth authentication for the FashionAIKit project.

## Prerequisites

- Google Cloud account
- FashionAIKit project (Next.js with NextAuth v5)
- Administrative access to configure environment variables

## Google Cloud Console Setup

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter "FashionAIKit" as the project name
5. Click "Create"
6. Select your new project from the project dropdown

### 2. Configure OAuth Consent Screen

1. In the Google Cloud Console, navigate to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (unless you're using Google Workspace)
3. Click "Create"
4. Fill in the required fields:
   - App name: "FashionAIKit"
   - User support email: [Your email]
   - Developer contact information: [Your email]
5. Click "Save and Continue"
6. On the "Scopes" page, click "Add or Remove Scopes"
7. Add the following scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
8. Click "Save and Continue"
9. On the "Test users" page, click "Add Users"
10. Add your email address as a test user
11. Click "Save and Continue"
12. Review your settings and click "Back to Dashboard"

### 3. Create OAuth 2.0 Client ID

1. In the Google Cloud Console, navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "OAuth client ID"
3. For Application type, select "Web application"
4. Enter "FashionAIKit Web Client" as the name
5. Add Authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: `https://your-production-domain.com`
6. Add Authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-production-domain.com/api/auth/callback/google`
7. Click "Create"
8. A modal will appear with your Client ID and Client Secret. Copy these values as you'll need them for configuration.

## FashionAIKit Configuration

### 1. Set Up Environment Variables

1. In your project root, locate the `.env.local` file (or create one if it doesn't exist)
2. Add the following environment variables:

```
# NextAuth
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your-auth-secret-here

# Google Provider
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

Replace `your-client-id-here` and `your-client-secret-here` with the values you obtained from the Google Cloud Console.

For `AUTH_SECRET`, generate a secure random string. You can use this command in your terminal:

```bash
openssl rand -base64 32
```

### 2. Update NextAuth Configuration

Make sure your `auth.js` file includes the Google provider configuration:

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
  // Additional configuration...
});
```

## Testing the Setup

1. Start your Next.js development server:

```bash
npm run dev
# or
yarn dev
```

2. Navigate to `http://localhost:3000/login`
3. Click on the "Sign in with Google" button
4. You should be redirected to Google's authentication page
5. After signing in with your Google account, you'll be redirected back to the FashionAIKit application

## Troubleshooting

### Common Issues

#### "Error 400: redirect_uri_mismatch"

This error occurs when the redirect URI in your NextAuth configuration doesn't match the authorized redirect URIs in the Google Cloud Console.

**Solution**: 
- Verify that the redirect URI in Google Cloud Console exactly matches `http://localhost:3000/api/auth/callback/google`
- Check for any typos or trailing slashes

#### "Error 401: invalid_client"

This error occurs when the client ID or client secret is incorrect.

**Solution**:
- Double-check your environment variables
- Ensure no extra spaces or characters were copied accidentally
- Verify you're using the correct client ID and secret for the right project

#### "Error: This app isn't verified"

During development, you might see a Google warning that the app isn't verified.

**Solution**:
- Since you added your email as a test user, click "Continue" to proceed
- For production, you'll need to verify your app through Google's verification process

## Production Deployment

When deploying to production:

1. Update your OAuth 2.0 Client ID in Google Cloud Console to include your production domain in the authorized origins and redirect URIs
2. Set the environment variables in your production environment:
   - Set `NEXTAUTH_URL` to your production URL
   - Set `AUTH_SECRET` to a new secure random string
   - Keep the same `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, or create new ones specifically for production

## Security Best Practices

1. **Never commit your environment variables** to version control
2. Regenerate your `AUTH_SECRET` for production
3. Limit the OAuth scopes to only what's needed
4. Consider implementing additional security measures like:
   - Rate limiting for authentication attempts
   - IP-based restrictions for sensitive operations
   - Regular audit of authentication logs

## Additional Resources

- [NextAuth Google Provider Documentation](https://next-auth.js.org/providers/google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
