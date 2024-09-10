'use client';
import React from 'react';

export default function QuoteSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-black py-16">
      {/* Video Background */}
      

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-white "></div>

      {/* Quote Content */}
      <div className="relative z-10 text-black text-center px-4 max-w-3xl mx-auto">
        <blockquote className="text-2xl md:text-3xl font-bold leading-tight">
          "This is a placeholder quote to inspire and elevate your journey."
        </blockquote>
        <p className="mt-4 text-lg md:text-xl font-medium">- Nolan Taft, CEO</p>
      </div>

      <style jsx>{`
        section {
          height: 50vh; /* Adjust the height of the quote section */
        }
        blockquote {
          max-width: 800px;
          margin: 0 auto;
        }
      `}</style>
    </section>
  );
}
