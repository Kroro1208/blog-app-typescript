import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./provider/nextAuthProvider";
import NextThemeProvider from "./provider/themeProvider";
import GlobalState from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Full Stack Blog App",
  description: "Next.js, TypeScriptを使用したフルスタックブログアプリの構築",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextThemeProvider>
          <NextAuthProvider>
            <GlobalState>
              {children}
            </GlobalState>
          </NextAuthProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
