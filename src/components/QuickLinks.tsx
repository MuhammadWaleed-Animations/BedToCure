'use client';

import Link from "next/link";

export const QuickLinks = () => {
  const links = [
    { text: "Search Hospital", href: "/search-hospital" },
    { text: "About Us", href: "/about" },
    { text: "Ask AI", href: "/ask-ai" },
    { text: "Check Booking Status", href: "/booking-status" },
    { text: "Contact Us", href: "/contact-us" },
  ];

  return (
    <nav className="flex flex-wrap gap-6 text-lg text-white mb-6 justify-center">
      {links.map((link, index) => (
        <Link key={index} href={link.href} className="hover:underline">
          {link.text}
        </Link>
      ))}
    </nav>
  );
};
