import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

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
