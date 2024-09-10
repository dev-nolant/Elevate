'use client';

import React, { useState } from 'react';

type SelectedOptionsType = {
  step1: string;
  step2: string;
  step3: string[];
  step4: string[];
  step5: string;
  step6: string[];
  step7: {
    name: string;
    company: string;
    email: string;
    phone: string;
    description: string;
    honeypot: string; // Honeypot field for anti-spam
  };
};

export default function ProjectForm() {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType>({
    step1: '',
    step2: '',
    step3: [],
    step4: [],
    step5: '',
    step6: [],
    step7: {
      name: '',
      company: '',
      email: '',
      phone: '',
      description: '',
      honeypot: '', // Initialize honeypot field
    },
  });

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal open state

  // Handle Input Changes
  const handleInputChange = (step: keyof SelectedOptionsType, value: any) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [step]: value,
    }));
  };

  const handleMultiSelectChange = (step: keyof SelectedOptionsType, value: string) => {
    if (Array.isArray(selectedOptions[step])) {
      setSelectedOptions((prev) => ({
        ...prev,
        [step]: (prev[step] as string[]).includes(value)
          ? (prev[step] as string[]).filter((item) => item !== value)
          : [...(prev[step] as string[]), value],
      }));
    }
  };

  const nextStep = () => {
    if (step < 7) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const errors: string[] = [];
    const { name, email, honeypot, company, phone, description } = selectedOptions.step7;
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    else if (!emailRegex.test(email)) errors.push('Invalid email format');
  
    // Check honeypot field
    if (honeypot) errors.push('Spam detected');
  
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      try {
        const message = `
          Step 1: ${selectedOptions.step1}
          Step 2: ${selectedOptions.step2}
          Step 3: ${selectedOptions.step3.join(', ')}
          Step 4: ${selectedOptions.step4.join(', ')}
          Step 5: ${selectedOptions.step5}
          Step 6: ${selectedOptions.step6.join(', ')}
          Company: ${company}
          Phone: ${phone}
          Description: ${description}
        `;
  
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        });
  
        if (response.ok) {
          setIsSubmitted(true);
        } else {
          setValidationErrors(['Something went wrong. Please try again.']);
        }
      } catch (err) {
        console.error('Error submitting form:', err);
        setValidationErrors(['Something went wrong. Please try again.']);
      }
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return isModalOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-lg w-full bg-gray-900 p-8 rounded-lg shadow-lg text-white relative">
        <button
          className="absolute top-2 right-2 text-white"
          onClick={closeModal} // Close modal here
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="mt-4">Your project details have been submitted successfully. We'll be in contact soon.</p>
            <button
              onClick={closeModal}
              className="mt-8 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-full transition-all duration-300 ease-in-out shadow-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold">What type of project is this?</h2>
                <p className="mt-4">Select the type of project you're planning to work on.</p>
                <div className="mt-6 space-y-4">
                  {['Website', 'Mobile App', 'E-commerce', 'Web App', 'Other'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('step1', option)}
                      className={`w-full bg-gray-800 py-3 rounded-md ${selectedOptions.step1 === option ? 'border border-blue-500' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextStep}
                  className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-full transition-all duration-300 ease-in-out shadow-lg"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold">When are you looking to start?</h2>
                <p className="mt-4">Choose a timeline for your project.</p>
                <div className="mt-6 space-y-4">
                  {['ASAP', 'In 1-2 months', 'In 3-6 months', 'Flexible'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('step2', option)}
                      className={`w-full bg-gray-800 py-3 rounded-md ${selectedOptions.step2 === option ? 'border border-blue-500' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    ← Previous
                  </button>
                  <button onClick={nextStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold">What platforms do you need?</h2>
                <p className="mt-4">Select the platforms you'd like to target.</p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {['Web', 'iOS', 'Android', 'Windows', 'macOS', 'Linux'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleMultiSelectChange('step3', option)}
                      className={`w-full bg-gray-800 py-3 rounded-md ${selectedOptions.step3.includes(option) ? 'border border-blue-500' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    ← Previous
                  </button>
                  <button onClick={nextStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold">Do you have specific technology requirements?</h2>
                <p className="mt-4">Select the technologies you'd like to use for this project.</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {['React', 'Angular', 'Vue', 'Node.js', 'Django', 'Ruby on Rails', 'Laravel', 'Spring'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleMultiSelectChange('step4', option)}
                      className={`w-full bg-gray-800 py-3 rounded-md ${selectedOptions.step4.includes(option) ? 'border border-blue-500' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    ← Previous
                  </button>
                  <button onClick={nextStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold">Do you need UI/UX design services?</h2>
                <p className="mt-4">Would you like our team to provide UI/UX design for your project?</p>
                <div className="mt-6 space-y-4">
                  {['Yes, I need design services', 'No, I have my own designs', 'Not sure yet'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('step5', option)}
                      className={`w-full bg-gray-800 py-3 rounded-md ${selectedOptions.step5 === option ? 'border border-blue-500' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    ← Previous
                  </button>
                  <button onClick={nextStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 6 */}
            {step === 6 && (
              <div>
                <h2 className="text-2xl font-bold">What are your project priorities?</h2>
                <p className="mt-4">Please rank the following factors in order of importance.</p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {['Cost', 'Speed', 'Scalability', 'Quality', 'Maintenance', 'Flexibility'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleMultiSelectChange('step6', option)}
                      className={`w-full bg-gray-800 py-3 rounded-md ${selectedOptions.step6.includes(option) ? 'border border-blue-500' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    ← Previous
                  </button>
                  <button onClick={nextStep} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 7 - Contact Page */}
            {step === 7 && (
              <div>
                <h2 className="text-2xl font-bold">Contact Details</h2>
                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    className="w-full bg-gray-800 py-3 rounded-md text-white pl-4"
                    value={selectedOptions.step7.name}
                    onChange={(e) => handleInputChange('step7', { ...selectedOptions.step7, name: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full bg-gray-800 py-3 rounded-md text-white pl-4"
                    value={selectedOptions.step7.company}
                    onChange={(e) => handleInputChange('step7', { ...selectedOptions.step7, company: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    className="w-full bg-gray-800 py-3 rounded-md text-white pl-4"
                    value={selectedOptions.step7.email}
                    onChange={(e) => handleInputChange('step7', { ...selectedOptions.step7, email: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone (Recommended)"
                    className="w-full bg-gray-800 py-3 rounded-md text-white pl-4"
                    value={selectedOptions.step7.phone}
                    onChange={(e) => handleInputChange('step7', { ...selectedOptions.step7, phone: e.target.value })}
                  />
                  <textarea
                    placeholder="A description of your project"
                    className="w-full bg-gray-800 py-3 rounded-md text-white pl-4"
                    value={selectedOptions.step7.description}
                    onChange={(e) => handleInputChange('step7', { ...selectedOptions.step7, description: e.target.value })}
                  />
                  {/* Honeypot field */}
                  <input
                    type="text"
                    placeholder="Leave this field empty"
                    className="hidden"
                    value={selectedOptions.step7.honeypot}
                    onChange={(e) => handleInputChange('step7', { ...selectedOptions.step7, honeypot: e.target.value })}
                  />
                </div>
                {validationErrors.length > 0 && (
                  <div className="mt-4 text-red-500">
                    <ul>
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  ) : null; // Return null when modal is closed
}
