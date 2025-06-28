import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PwdGen - Modern Desktop Password Generator",
  description:
    "A secure, customizable desktop password generator with Material 3 UI. Available for Linux with Windows support coming soon.",
  keywords: [
    "password generator",
    "desktop app",
    "security",
    "Material 3",
    "Kotlin",
    "Compose Desktop",
    "Linux",
    "APT package",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            <Navbar />
            <main>{children}</main>
            <footer className="py-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="container mx-auto px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                <p>
                  © {new Date().getFullYear()} Zahid Khalilov. All rights
                  reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
