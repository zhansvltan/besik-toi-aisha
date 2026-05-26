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
  title: "Аиша - Бесік той",
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
          href="/mobile-bg.webp"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/desktop-bg.webp"
          media="(min-width: 768px)"
        />
      </head>
      <body className="relative size-full overflow-hidden bg-[url('/mobile-bg.webp')] bg-cover bg-center bg-no-repeat font-sans text-foreground md:bg-[url('/desktop-bg.webp')] md:bg-[length:100%_auto] md:bg-top">
        {children}
        <img
          className="pointer-events-none hidden absolute z-30 right-0 bottom-0 select-none md:w-[55%] md:block"
          src="/right-corner-desktop.webp"
          alt=""
        />
        <img
          className="pointer-events-none hidden absolute z-30 left-0 top-0 select-none md:w-[52%] md:block"
          src="/left-corner-desktop.webp"
          alt=""
        />
        <img
          className="pointer-events-none block absolute z-30 -left-3 -top-6 w-[95%] select-none md:w-[40%] md:hidden"
          src="/left-corner-mobile.webp"
          alt=""
        />
        <img
          className="pointer-events-none block absolute z-30 right-[21%] -bottom-4 w-[60%] select-none md:w-[40%] md:hidden"
          src="/right-corner-mobile-pl.webp"
          alt=""
        /> 
        <img
          className="pointer-events-none block absolute z-30 -right-12 -bottom-6 w-[48%] select-none md:w-[40%] md:hidden"
          src="/right-corner-mobile-pr.webp"
          alt=""
        />
      </body>
    </html>
  );
}
