import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SelfProvider } from "@/features/user/contexts/self";
import { getSelf } from "@/features/user/get-self";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EXP. 交通費精算",
};

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const self = await getSelf();

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SelfProvider self={self}>{children}</SelfProvider>
      </body>
    </html>
  );
}
