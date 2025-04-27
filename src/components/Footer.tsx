import { QuickLinks } from "./QuickLinks";

export const Footer = () => {
  return (
    <footer className="bg-[#4b623a] py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-xl font-extrabold text-white mb-4">Quick links</h2>
        <QuickLinks />
        <p className="text-white text-xs mt-4">&copy; 2025. All rights reserved</p>
      </div>
    </footer>
  );
};
