"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../components/ui/input";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <div className="text-3xl font-black text-[#416e1a]">BedToCure</div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <nav className="flex gap-6 text-lg text-black">
          <a href="/home" className="hover:underline">Home</a>
          <a href="/hospitals" className="hover:underline">Book now</a>
          <a href="/about" className="hover:underline">About Us</a>
        </nav>
      </div>
    </header>
  );
};
