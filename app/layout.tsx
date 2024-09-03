import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilRootProvider from "@/lib/providers/RecoilRootProvider";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cryptoCave",
  description: "ETH/SOL Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RecoilRootProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </RecoilRootProvider>
    </html>
  );
}
