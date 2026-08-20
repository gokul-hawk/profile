import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"; // Assuming you created one

export const metadata: Metadata = {
  title: "[Your Name] | Professional Portfolio",
  description: "Software Engineer specializing in Next.js & AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased">  
        {/* The children here will be wrapped by the template.tsx animation */}
        {children}
      </body>
    </html>
  );
}