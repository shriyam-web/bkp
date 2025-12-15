import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bharatparty.in/'),
  title: 'Bahujan Kranti Party | Building a Better India',
  description: 'Bahujan Kranti Party - A movement dedicated to creating positive change and empowering every citizen for a progressive, inclusive, and prosperous India.',
  keywords: 'Bahujan Kranti Party, political party, India, social change, inclusive development, democracy, citizen empowerment',
  authors: [{ name: 'Bahujan Kranti Party' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// Create an admin dashboard from where we can add up / edit / delete the members in national commettie, state commettie, everything i can control from there.Create the admin side with a demo credentials as well.

