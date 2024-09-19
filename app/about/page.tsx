'use client';
import React from 'react';
import Header from '../components/Header';
import Info from '../components/Info';
import '../globals.css';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/header-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Header with space above */}
      <Info className="relative top-0 left-0 right-0 z-10" />
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-start justify-center text-left h-full px-6 overflow-y-auto">
        <div className="text-white max-w-3xl select-none z-0">
          <h1 className="text-4xl md:text-6xl font-sans leading-tight">
            About Us
          </h1>
          <p className="mt-6 text-lg md:text-xl">
            Elevate was founded with the vision of empowering businesses through innovative tech solutions. With a team of dedicated professionals, we strive to deliver excellence in every project we undertake.
          </p>
          <p className="mt-4 text-lg md:text-xl">
            Our mission is to create value for our clients through cutting-edge technology and innovative solutions. We believe in building lasting partnerships and delivering exceptional results that drive business growth and success.
          </p>
          <p className="mt-4 text-lg md:text-xl">
            We believe in quality, precision, and creating software that not only meets but exceeds expectations. Our team is dedicated to working closely with you to understand your needs and deliver results that truly elevate your business.
          </p>
        </div>
      </main>

      <style jsx>{`
        main {
          margin-top: 15vh; /* Adjust the vertical position */
        }
        h1 {
          max-width: 80%; /* Limit the text width */
        }
        p {
          max-width: 90%; /* Limit the paragraph width */
        }
      `}</style>
    </div>
  );
}
