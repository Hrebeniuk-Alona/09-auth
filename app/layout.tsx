import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import React from "react";
import AuthProvider from "@/components/AuthProvider/AuthProvider";


const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "NoteHub – Plan, Add, and Organize Your Tasks",
  description: "NoteHub is a simple and efficient app for managing your tasks. Add, delete, and stay on top of your daily plans with ease.",
  openGraph: {
    title: "NoteHub – Plan, Add, and Organize Your Tasks",
    description: "NoteHub is a simple and efficient app for managing your tasks. Add, delete, and stay on top of your daily plans with ease.",
    url: "https://08-zustand-fawn-six.vercel.app/",
    images:[{
        url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
        width: 1200,
        height: 630,
        alt: `NoteHub`,
      }]
  }
};

export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
        <main>
            {children}
            {modal}
        </main>
          <Footer />
          </AuthProvider>
        
        </TanStackProvider>
      </body>
    </html>
  );
}

