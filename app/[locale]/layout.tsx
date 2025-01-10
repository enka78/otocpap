"use client";

import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartSheet } from "@/components/cart-sheet";
import { use } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers locale={locale}>
          <div className="relative min-h-screen">
            <Navbar />
            <CartSheet />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
