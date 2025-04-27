import "./../styles/globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BedToCure",
  description: "Emergency hospital bed booking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
