// File: src/components/Footer.tsx
'use client';

import { QuickLinks } from "@/components/QuickLinks";

export const Footer = () => {
  return (
    <footer className="bg-[#4b623a] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-white mb-6">Quick Links</h2>

        {/* Links Navigation */}
        <QuickLinks />

        {/* Bottom Line */}
        <div className="border-t border-white/30 w-full mt-6 pt-4 flex justify-center">
          <p className="text-white text-sm">&copy; 2025 BedToCure. All rights reserved.</p>
          <p className="text-white text-xs mt-1">Made with ❤️ by NUCES-FAST Students</p>
        </div>
      </div>
    </footer>
  );
};
