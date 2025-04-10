import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { initializeDatabase } from '@/lib/db/init';
import SessionProvider from '@/components/auth/SessionProvider';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'FashionAIKit - AI-Powered Fashion Assistant',
  description:
    'Discover your perfect style with AI. Get personalized fashion recommendations and virtual try-on.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}>) {
  try {
    // This runs server-side and will initialize your database connection
    await initializeDatabase();
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${montserrat.variable} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
