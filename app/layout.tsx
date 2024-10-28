import type { Metadata } from 'next';
import './globals.css';

import { Vazirmatn } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Harmony'
};

const font = Vazirmatn({
  subsets: ['latin', 'arabic']
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        dir="rtl"
        className={cn(
          'min-h-screen bg-gradient-to-br from-blue-200 via-indigo-100 to-gray-100 dark:from-gray-700 dark:via-gray-700 dark:to-gray-600 transition-colors duration-300',
          font.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
