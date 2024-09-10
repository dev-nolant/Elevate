'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Info from '../../components/Info';
import Footer from '../../components/Footer';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import '../../globals.css';

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a wide range of software development services including web development, mobile app development, and custom software solutions."
  },
  {
    question: "How can I contact support?",
    answer: "You can contact our support team via email at support@elevate.codes or call us at +1(813) 530-5847."
  },
  {
    question: "What is your pricing model?",
    answer: "Our pricing is flexible and depends on the scope and complexity of the project. We offer both fixed-price and hourly billing options."
  },
  {
    question: "Do you offer maintenance services?",
    answer: "Yes, we offer ongoing maintenance and support services to ensure your software remains up-to-date and fully functional."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "The timeline for a project depends on its size and complexity. We will provide an estimated timeline after discussing your requirements."
  }
];

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);

  const toggleTheme = () => {
    setIsBlackAndWhite(!isBlackAndWhite);
  };

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${isBlackAndWhite ? 'bg-white' : 'bg-black'}`}>
      {/* Video Background */}
      {!isBlackAndWhite && (
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/header-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      <div className={`absolute top-0 left-0 w-full h-full ${isBlackAndWhite ? 'bg-white' : 'bg-black opacity-50'}`}></div>

      {/* Header and Info */}
      <Info className="relative top-0 left-0 right-0 z-10" />
      <Header />


      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-start justify-center text-left h-full px-6">
        <div className={`max-w-2xl mx-auto mt-20 mb-96 p-8 rounded-lg shadow-lg ${isBlackAndWhite ? 'text-black bg-white border border-black' : 'text-white bg-gray-900 bg-opacity-75'}`}>
          <h1 className="text-4xl md:text-6xl font-sans leading-tight mb-10 text-center flex items-center justify-center">
            <FaQuestionCircle className="mr-4" /> Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-600 pb-4">
                <div
                  className={`flex items-center justify-between cursor-pointer ${isBlackAndWhite ? 'text-black' : 'text-white'} mb-2`}
                  onClick={() => toggleFAQ(index)}
                >
                  <h2 className="text-2xl">
                    {faq.question}
                  </h2>
                  <span>
                    {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-max-height duration-500 ease-in-out ${expandedIndex === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <p className={`mt-2 pl-8 ${isBlackAndWhite ? 'text-black' : 'text-gray-400'}`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
