'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
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
        <h1 className="text-4xl text-[#477e40] font-bold text-center mb-6">About BedToCure</h1>
        <p className="text-center text-gray-700 mb-8">
          Introducing BedToCure, a revolutionary system that simplifies hospital bed allocation and pre-booking, designed to streamline hospital operations and enhance patient care.
        </p>

        <div className="flex flex-col gap-6">
          <section>
            <h2 className="text-xl text-[#477e40] font-semibold">Our Mission</h2>
            <p className="text-gray-700">
              BedToCure is committed to improving hospital bed management through real-time tracking and pre-booking features. Our mission is to reduce waiting times, improve hospital efficiency, and offer patients a seamless experience in securing hospital beds for treatment.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#477e40] font-semibold">The Team Behind BedToCure</h2>
            <ul className="text-gray-700 list-disc pl-6">
              <li><strong>Muhammad Waleed (22L-6824)</strong> – Founder</li>
              <li><strong>Armeen Fatima (22L-6981)</strong> – CEO</li>
              <li><strong>Arooba Iqbal (22L-6996)</strong> – Frontend Developer</li>
              <li><strong>Muhammad Usman (22L-6665)</strong> – Backend Developer</li>
              <li><strong>Abdullah Khawaja (22L-6635)</strong> – Database Administrator</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-[#477e40] font-semibold">Why BedToCure?</h2>
            <p className="text-gray-700">
              In the fast-paced world of healthcare, BedToCure offers a reliable solution for hospital bed allocation. With real-time tracking, 90-minute pre-booking, and cost transparency, we aim to help both hospitals and patients navigate the complex world of bed management with ease.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#477e40] font-semibold">System Features</h2>
            <ul className="text-gray-700 list-inside">
              <li><strong>Real-Time Bed Availability Tracking</strong>: Ensure patients always have the most up-to-date information about available beds.</li>
              <li><strong>Pre-Booking Functionality</strong>: Book beds for up to 90 minutes to secure the necessary time for treatment.</li>
              <li><strong>Online Payment Integration</strong>: Stripe and Razorpay integration to facilitate seamless payment transactions.</li>
              <li><strong>Admin Panel</strong>: Hospital administrators can manage and update bed availability in real time.</li>
              <li><strong>User Notifications and Alerts</strong>: Instant notifications keep users informed about their bookings and cancellations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-[#477e40] font-semibold">Our Commitment to Quality</h2>
            <p className="text-gray-700">
              We prioritize security, performance, and user experience. BedToCure is designed to meet healthcare standards with data encryption, secure payment processing, and compliance with regulations such as GDPR and HIPAA.
            </p>
          </section>
        </div>

        <div className="text-center mt-8">
          <Button className="bg-[#477e40] hover:bg-[#355c31] transition text-white">
            Learn More About Our System
          </Button>
        </div>
      </div>
    </div>
  );
}
