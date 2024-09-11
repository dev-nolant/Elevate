'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ElevateDivider from '../components/ElevateDivider';
import Info from '../components/Info';
import ProjectForm from './project/page'; // Import the modal form component
import '../globals.css';

export default function Pricing() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/header-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Header and Info */}
      <Info className="relative top-0 left-0 right-0 z-10" />
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-start justify-center text-left h-full px-6">
        <div className="text-white max-w-4xl select-none z-0">
          <h1 className="text-4xl md:text-6xl font-sans leading-tight">Pricing Plans</h1>
          <p className="mt-6 text-lg md:text-xl">
            Choose the plan that fits your business. Simple pricing with no hidden fees. Scale as you grow.
          </p>

          {/* Pricing Table */}
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {/* Basic Plan */}
            <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold">Basic</h2>
              <p className="mt-4 text-lg">$500 + hosting costs</p>
              <ul className="mt-6 space-y-4 text-left">
                <li>✓ Professional design & development to get your project off the ground.</li>
                <li>✓ Essential support to ensure your site runs smoothly.</li>
                <li>✓ Access to core features to kickstart your digital presence.</li>
              </ul>
              <div className="mt-auto">
                <button
                  onClick={openModal}
                  className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-8 rounded-full transition-all duration-300 ease-in-out shadow-lg"
                >
                  Choose Basic
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-800 rounded-lg p-8 border border-blue-500 flex flex-col items-center">
              <h2 className="text-2xl font-bold">Pro</h2>
              <p className="mt-4 text-lg">$1500 + hosting costs</p>
              <ul className="mt-6 space-y-4 text-left">
                <li>✓ Advanced design & development tailored to your business needs.</li>
                <li>✓ Priority support with faster response times and expert guidance.</li>
                <li>✓ Full access to all features and capabilities to grow your business.</li>
              </ul>
              <div className="mt-auto">
                <button
                  onClick={openModal}
                  className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-8 rounded-full transition-all duration-300 ease-in-out shadow-lg"
                >
                  Choose Pro
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold">Enterprise</h2>
              <p className="mt-4 text-lg">Per project</p>
              <ul className="mt-6 space-y-4 text-left">
                <li>✓ Custom business solutions built from the ground up to meet your specific requirements.</li>
                <li>✓ Dedicated support team ensuring every aspect of your project is handled with care.</li>
                <li>✓ Custom feature development and ongoing updates to keep you ahead of the competition.</li>
              </ul>
              <div className="mt-auto">
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-8 rounded-full transition-all duration-300 ease-in-out shadow-lg"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      
      </main>
      <div className='py-16'></div>
      <Footer />
      {showModal && <ProjectForm />} {/* Removed closeModal prop */}

      <style jsx>{`
        main {
          margin-top: 15vh; /* Adjust vertical position */
        }
        h1, p {
          max-width: 80%;
          text-align: left; /* Left-align the heading and paragraph */
        }
        .pricing-table {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
        }
        .pricing-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 1rem;
          text-align: left;
          width: 100%;
        }
        button {
          min-width: 160px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
