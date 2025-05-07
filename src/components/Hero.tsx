import { Button } from "@/components/ui/button";
import { BookingStatus } from "./BookingStatus";
import { Highlights } from "./Highlights";
import { Banner } from "./Banner";

export const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center flex-1 bg-cover bg-center px-6"
      style={{ backgroundImage: "url('/website-background.png')" }}
    >
      <h1 className="text-5xl font-bold text-black text-center mb-8">
        Want a bed in emergency?
      </h1>

      <a href="/hospitals" >
        <Button className="bg-[#477e40] hover:bg-[#366630] text-white text-2xl px-10 py-4 rounded-lg mb-8">
          Book now
        </Button>
      </a>

      <BookingStatus />
      <Highlights />
      <Banner />
    </section>
  );
};
