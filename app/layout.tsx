import type { Metadata } from "next";
import "./custom.css";
import "./globals.css";

import { aeonik } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Project BBM",
  description: "Rental and listing service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aeonik.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
