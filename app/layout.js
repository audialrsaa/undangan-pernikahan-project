import "./globals.css";

import {
  Cormorant_Garamond,
  DM_Sans,
  Pinyon_Script,
} from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dmsans",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata = {
  title: "Adhe & Alfa — Syukuran Pernikahan",
  description:
    "Undangan syukuran pernikahan Adhe Noerma Yunita & Alfa Fadhila, Jumat 09 Oktober 2026 di Jakarta Barat.",
};

export const viewport = {
  themeColor: "#3A4431",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${dmSans.variable} ${pinyon.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}