'use client';
import React, { useState } from 'react';

export default function Footer() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ email: '', name: '', message: '' });
        setStep(1); // Reset to step 1 after submission
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(true);
    }
  };

  return (
    <footer className="relative bg-black text-white py-16 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/header-video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Frosty Blur Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">
            <a href="/" className="hover:text-gray-400">
              On the Road to Success with Elevated Codes
            </a>
          </h3>
        </div>

        

        {/* Column 3 */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">Company</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="/about" className="hover:text-gray-400">About Us</a>
            </li>
            <li>
              <a href="/legal/privacy" className="hover:text-gray-400">Privacy Policy</a>
            </li>
            <li>
              <a href="/legal/faq" className="hover:text-gray-400">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">Social Media</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="https://www.linkedin.com/company/elevate-codes/" className="hover:text-gray-400">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/elevatecodes" className="hover:text-gray-400">GitHub</a>
            </li>
          </ul>
        </div>

        {/* Multi-Step Form or Thank You Message */}
        <div className="md:col-span-2 mt-8 md:mt-0">
          {submitted ? (
            <div className="text-center text-gray-400">
              <h4 className="text-xl font-semibold mb-4">Thank you for contacting us!</h4>
              <p>We appreciate your message. We'll be in touch soon!</p>
            </div>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              {step === 1 && (
                <div>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-transparent border-b border-gray-600 text-gray-400 py-2 focus:outline-none"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 mt-1 mr-1"
                    onClick={handleNext}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <input
                    type="text"
                    name="name"
                    className="w-full bg-transparent border-b border-gray-600 text-gray-400 py-2 focus:outline-none"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 mt-1 mr-1"
                    onClick={handleNext}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {step === 3 && (
                <div>
                  <textarea
                    name="message"
                    className="w-full bg-transparent border-b border-gray-600 text-gray-400 py-2 focus:outline-none"
                    placeholder="Your Message (Optional)"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 mt-1 mr-1"
                    onClick={handleNext}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-400"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                    </svg>
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}
