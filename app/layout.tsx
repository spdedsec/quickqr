import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickQR — QR Code Generator",
  description: "A fast, simple QR code generator.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}