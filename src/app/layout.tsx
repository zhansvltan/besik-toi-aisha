import type { Metadata } from "next";
import { Cormorant_Infant, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
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
      <body className="relative size-full overflow-hidden bg-[url('/mobile-background.png')] bg-cover bg-center bg-no-repeat font-sans text-foreground md:bg-[url('/uzatu-background.svg')] md:bg-center">
        {children}

        <img
          className="hidden absolute z-30 right-[-7.2%] bottom-[-2.1%]  w-[66.7%] select-none md:w-[40%] md:block"
          src="/left-corner-overlay-flowers.png"
        />
        <img
          className="hidden absolute z-30 left-0 top-0 h-auto w-[100%] select-none md:w-[40%] md:block"
          src="/right-corner-overlay-flowers.png"
        />

         <img
          className="block absolute z-30 right-[-7.2%] bottom-[-2.1%]  w-[66.7%] select-none md:w-[40%] md:hidden"
          src="/mobile-right-corner.png"
        />
        <img
          className="block absolute z-30 left-0 top-0 h-auto w-[100%] select-none md:w-[40%] md:hidden"
          src="/mobile-left-corner.png"
        />
      </body>
    </html>
  );
}
