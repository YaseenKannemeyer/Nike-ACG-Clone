import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Nike ACG — All Conditions Gear",
  description:
    "Built for every terrain. Nike ACG — technical outdoor gear engineered for all conditions.",
  openGraph: {
    title: "Nike ACG — All Conditions Gear",
    description: "Technical outdoor gear for all conditions.",
    siteName: "Nike ACG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main id="page-wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
