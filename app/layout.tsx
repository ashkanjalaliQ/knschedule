import type { Metadata } from 'next';
import './globals.css';

import { Vazirmatn } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'برنامه هفتگی صنایع',
  description: 'برنامه هفتگی دانشجویان رشته مهندسی صنایع',
  robots: {
    index: false,
    follow: false
  }
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
          'min-h-screen bg-gradient-to-br from-blue-200 via-indigo-100 to-gray-100 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300',
          font.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
