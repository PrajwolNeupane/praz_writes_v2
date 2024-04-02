import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components";
import dynamic from "next/dynamic";
import ShortCutKeyProvider from "@/layouts/ShotCutKeysProvider";

const NextProgress = dynamic(() => import("@/components/NextProgressBar"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Praz Writes",
  description:
    "Discover captivating narratives, expert insights, and creative musings on technology, design, and more at Praz Writes, curated by Prajwol Neupane. Welcome to Praz Writes – your destination for thought-provoking blogs by Prajwol Neupane. Delve into a world of captivating narratives, expert insights, and creative musings on technology, design, and beyond. Join us on a journey of discovery at Praz Writes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShortCutKeyProvider
          children={
            <>
              <NextProgress />
              <NavBar />
              {children}
            </>
          }
        />
      </body>
    </html>
  );
}
