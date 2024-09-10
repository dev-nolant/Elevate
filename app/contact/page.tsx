'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Info from '../components/Info';
import Footer from '../components/Footer';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import '../globals.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Honeypot field for anti-spam
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if honeypot field has been filled out (indicating a bot)
    if (formData.honeypot) {
      setError(true);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-2">
      {/* Header */}
      <Header isDarkMode={false} />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg bg-white border border-gray-200">
          <h1 className="text-4xl md:text-6xl font-sans leading-tight mb-10 text-center">
            Contact Us
          </h1>

          {submitted ? (
            <p className="mt-6 text-center text-green-500">
              Thank you for your message. We'll get back to you soon!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-100 border-gray-300 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-100 border-gray-300 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-100 border-gray-300 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
                rows={5}
                required
              />
              {/* Honeypot field (hidden from users, visible to bots) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                autoComplete="off"
                tabIndex={-1}
              />
              <button
                type="submit"
                className="p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200 ease-in-out shadow-md"
              >
                Send Message
              </button>
              {error && <p className="text-red-500 text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>

        {/* Contact Info Section */}
        <div className="max-w-2xl mx-auto mt-10 p-4 text-center">
          <p className="text-lg font-medium">You can also reach us at:</p>
          <p className="text-lg">
            <a href="mailto:nolan@elevate.codes" className="text-blue-600 hover:underline">info@elevate.codes</a>
          </p>
          <p className="text-lg">
            <a href="tel:+18135305847" className="text-blue-600 hover:underline">+1(813) 530-5847</a>
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.linkedin.com/company/elevate-codes/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-6 h-6 text-blue-600" />
            </a>
            <a href="https://github.com/elevatecodes" target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-6 h-6 text-black" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
