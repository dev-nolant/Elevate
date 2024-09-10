'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Opening from './components/opening';
import BusinessDirections from './components/BusinessDirections';
import QuoteSection from './components/QuoteSection';
import Footer from './components/Footer';
import ElevateDivider from './components/ElevateDivider';
import ContactForm from './components/ContactForm'; // Import the ContactForm component
import FAQSection from './components/FAQ';
import './globals.css';

export default function Home() {
  // Define variants for more complex animations
  const slideInLeft = {
    hidden: { opacity: 0, x: -200, rotate: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const parallaxEffect = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const scaleUpEffect = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Ref for the in-view animation trigger
  const businessDirectionsRef = useRef(null);
  const faqSectionRef = useRef(null);
  const contactFormRef = useRef(null);

  const isBusinessDirectionsInView = useInView(businessDirectionsRef, { once: true, margin: '-50px' });
  const isFAQSectionInView = useInView(faqSectionRef, { once: true, margin: '-50px' });
  const isContactFormInView = useInView(contactFormRef, { once: true, margin: '-50px' });

  return (
    <div className="relative">
      {/* Neural Network Background */}
      <div className="neural-network-background absolute inset-0 z-0"></div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Opening Section: Immediate load */}

          <Opening />


        <ElevateDivider />

        {/* Business Directions Section: Parallax effect */}
        <motion.div
          ref={businessDirectionsRef}
          initial="hidden"
          animate={isBusinessDirectionsInView ? 'visible' : 'hidden'}
          variants={parallaxEffect}
        >
          <BusinessDirections />
        </motion.div>

        {/* FAQ Section: Slide-in from the left with rotation */}
        <motion.div
          ref={faqSectionRef}
          initial="hidden"
          animate={isFAQSectionInView ? 'visible' : 'hidden'}
          variants={slideInLeft}
        >
          <FAQSection />
        </motion.div>

        {/* Contact Form Section: Scale-up effect */}
        <motion.div
          ref={contactFormRef}
          initial="hidden"
          animate={isContactFormInView ? 'visible' : 'hidden'}
          variants={scaleUpEffect}
          className="text-black py-16"
        >
          <ContactForm blackAndWhite={true} /> {/* Pass the blackAndWhite prop */}
        </motion.div>

        <ElevateDivider />

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
}
