import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Our Story",
  description: "Our Story Signup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#faf5ff",
              color: "#6b21a8",
              border: "1px solid #c084fc",
            },
            success: {
              iconTheme: {
                primary: "#9333ea",
                secondary: "#f3e8ff",
              },
              duration: 3000,
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
