'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactUsPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-6"
      style={{
        backgroundImage: "url('/website-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 max-w-2xl w-full rounded-xl shadow-lg p-8">
        <h1 className="text-4xl text-[#477e40] font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center text-gray-700 mb-8">
          We'd love to hear from you! Please fill out the form below.
        </p>

        <form className="flex flex-col gap-5">
          <div>
            <label className="text-gray-800 font-medium">Name</label>
            <Input type="text" placeholder="Your Name" className="mt-2" />
          </div>

          <div>
            <label className="text-gray-800 font-medium">Email</label>
            <Input type="email" placeholder="Your Email" className="mt-2" />
          </div>

          <div>
            <label className="text-gray-800 font-medium">Message</label>
            <textarea
              className="mt-2 w-full rounded-md border-gray-300 focus:border-[#477e40] focus:ring-[#477e40] min-h-[120px] p-3"
              placeholder="Your Message..."
            ></textarea>
          </div>

          <Button type="submit" className="bg-[#477e40] hover:bg-[#355c31] transition text-white mt-4">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}

