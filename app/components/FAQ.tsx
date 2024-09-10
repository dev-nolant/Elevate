import { useState } from 'react';

const faqData = [
  { question: "What services do you offer?", answer: "We specialize in cutting-edge software development, offering services such as web development, mobile app creation, cloud-based solutions, and custom software tailored to your business needs." },
  { question: "How much does a custom project cost?", answer: "Our pricing varies depending on the project's complexity and scope. We ensure transparency in pricing and offer customized quotes based on your specific requirements." },
  { question: "How long does it take to complete a project?", answer: "Project timelines depend on the complexity of the work. After discussing your needs, we establish a detailed timeline that aligns with your business goals." },
];

export default function FAQSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index); // Toggle FAQ expansion
  };

  return (
    <section className="py-16 ">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="mb-6 transition-all duration-300"
          >
            {/* Question Box */}
            <div
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg flex justify-between items-center"
              onClick={() => toggleFaq(index)}
              style={{ minHeight: '80px' }} // Ensuring the question box has enough height for content on mobile
            >
              <h3 className="text-xl font-semibold text-left">{faq.question}</h3>
              <span>{expandedFaq === index ? '-' : '+'}</span>
            </div>

            {/* Answer Box */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out`}
              style={{
                maxHeight: expandedFaq === index ? '150px' : '0px', // Smooth height transition for the answer box
                padding: expandedFaq === index ? '16px' : '0px', // Add padding only when expanded
              }}
            >
              <div className="bg-gray-100 rounded-lg">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
