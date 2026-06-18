import type { Metadata } from "next";
import { Playfair_Display, Inter, Italianno } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const display = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["400","500","600"], style: ["normal","italic"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const script = Italianno({ variable: "--font-script", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Mikauri Nail Salon & Spa — Park Ave, Orange NJ",
  description: "Manicures, pedicures, gel, dip, lash, and waxing. A quiet salon on Park Avenue, Orange NJ. 66 reviews · 4.4★.",
  openGraph: { title: "Mikauri Nail Salon & Spa · Orange NJ", description: "Considered nail care.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable} antialiased`}>
      <body className="bg-porcelain text-charcoal min-h-screen">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
