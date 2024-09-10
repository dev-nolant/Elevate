'use client';

import { useState } from 'react';

export default function ContactForm({ blackAndWhite = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(true);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto p-8 rounded-lg shadow-lg ${blackAndWhite ? 'bg-white text-black border border-black' : 'bg-gray-900 text-white bg-opacity-75'}`}>
      <h1 className="text-4xl md:text-6xl font-sans leading-tight mb-10 text-center">
        Contact Us
      </h1>

      {submitted ? (
        <p className={`mt-6 text-center ${blackAndWhite ? 'text-black' : 'text-green-500'}`}>
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
            className={`p-3 border rounded-lg ${blackAndWhite ? 'bg-gray-100 border-black text-black' : 'bg-gray-800 border-gray-700 text-white'} placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out`}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={`p-3 border rounded-lg ${blackAndWhite ? 'bg-gray-100 border-black text-black' : 'bg-gray-800 border-gray-700 text-white'} placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out`}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className={`p-3 border rounded-lg ${blackAndWhite ? 'bg-gray-100 border-black text-black' : 'bg-gray-800 border-gray-700 text-white'} placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out`}
            rows={5}
            required
          />
          <button
            type="submit"
            className={`p-3 rounded-lg transition-colors duration-200 ease-in-out shadow-md ${blackAndWhite ? 'bg-white border border-black text-black hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Send Message
          </button>
          {error && <p className="text-red-500 text-center">Something went wrong. Please try again.</p>}
        </form>
      )}
    </div>
  );
}
