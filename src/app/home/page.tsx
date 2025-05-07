"use client";
import { Header } from "../../components/Header";
import { Hero } from "../../components/Hero";
import { Footer } from "../../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
        <main className="min-h-screen flex flex-col bg-white">
          <Hero />
        </main>
      <Footer />
    </div>
  );
}
