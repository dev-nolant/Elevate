'use client';
import React from 'react';
import useTypewriter from './useTypewriter';
import Header from './Header';
import Info from './Info';
import '../globals.css';

export default function Opening() {
  const text = useTypewriter(
    [
      'Elevate your business with custom software',
      'Stand out among your competitors with Elevated software solutions',
    ],
    50, // Typing speed
    100, // Deleting speed
    2000 // Pause before deleting
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/header-video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Info Component */}
      <Info className="relative top-0 left-0 right-0 z-10" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-start text-left h-full px-6">
        <div className="text-white max-w-3xl select-none z-0"> {/* Set z-index to 0 to ensure it's below the menu */}
          <h1 className="text-4xl md:text-6xl font-sans leading-tight">
            {text}
            <span className="cursor-caret ml-1 animate-blink"></span>
          </h1>
        </div>
      </main>

      <style jsx>{`
        main {
          margin-top: 20vh; /* Adjust the vertical position */
        }
        h1 {
          max-width: 80%; /* Limit the text width */
        }
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        .cursor-caret {
          display: inline-block;
          width: 1px; /* Set the width to make the cursor thinner */
          height: 1em; /* Make sure the height matches the text line height */
          background-color: white; /* Cursor color */
          margin-left: 0.1rem; /* Adjust spacing if needed */
        }
      `}</style>
    </div>
  );
}
