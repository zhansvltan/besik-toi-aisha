import type { Metadata } from "next";
import { Cormorant_Infant, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorantInfant = Cormorant_Infant({
  variable: "--font-cormorant-infant",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "700"],
});

const bickhamScript = localFont({
  src: "./font/bickhamscriptthree.otf",
  variable: "--font-bickham-script",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Аружан - Ұзату той",
  description:
    "Құрметті қонақ, сізді қызымыз Аружанның ұзату тойына шақырамыз!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorantInfant.variable} ${bickhamScript.variable} h-full w-full overflow-hidden antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/mobile-background.webp"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/desktop-background.webp"
          media="(min-width: 768px)"
        />
      </head>
      <body className="relative size-full overflow-hidden bg-[url('/mobile-background.webp')] bg-cover bg-center bg-no-repeat font-sans text-foreground md:bg-[url('/desktop-background.webp')] md:bg-center">
        {children}
      </body>
    </html>
  );
}
