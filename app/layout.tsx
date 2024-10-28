import type { Metadata } from "next";
import "./globals.css";

import { Vazirmatn } from "next/font/google";

export const metadata: Metadata = {
  title: "Harmony",
};

const font = Vazirmatn({
  subsets: ["latin", "arabic"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body dir="rtl" className={font.className}>
        {children}
      </body>
    </html>
  );
}
