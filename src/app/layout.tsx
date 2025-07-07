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
  title: "우리의 이야기",
  description:
    "함께 써 내려가는 이야기, 지금 Our Story에 가입하고 당신의 이야기를 남겨보세요.",
  icons: {
    icon: "/favicon.png",
  },
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
              maxWidth: "600px",
              textAlign: "center",
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
