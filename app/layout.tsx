import type { Metadata } from "next";
import "./globals.css";
import VisitorTracker from "@/app/components/VisitorTracker"; // <-- Import it here

export const metadata: Metadata = {
  title: "Gokul Udhayan | Portfolio",
  description: "Personal Portfolio Showcase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <VisitorTracker /> {/* <-- Render it here */}
        {children}
      </body>
    </html>
  );
}