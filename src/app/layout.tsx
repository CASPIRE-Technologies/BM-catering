import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuotationProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language-context";
import { WhatsAppFloatingButton } from "@/components/public/WhatsAppFloatingButton";

export const metadata: Metadata = {
  title: "B.M Catering | Luxury Event Catering, Rentals & Lighting • Sri Lanka",
  description:
    "Sri Lanka's leading event services company specializing in luxury wedding & corporate catering, marquee and furniture rentals, and enchanting event lighting design.",
  keywords: [
    "Sri Lanka catering",
    "wedding catering Colombo",
    "event rentals Sri Lanka",
    "marquee hire",
    "Chiavari chairs Sri Lanka",
    "event lighting Colombo",
    "BM Catering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#26383C] antialiased selection:bg-[#A6B9BE] selection:text-black">
        <LanguageProvider>
          <QuotationProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloatingButton />
          </QuotationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
