'use client';

import React, { useState, useEffect } from 'react';
import { FaBuilding, FaIndustry, FaMoneyBillWave, FaBolt, FaCog, FaGraduationCap, FaShoppingCart, FaTruck, FaTools, FaWarehouse, FaLandmark, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';

export default function BusinessDirections() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iconsReady, setIconsReady] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Preload all icons to prevent rendering issues on mobile
  useEffect(() => {
    const loadIcons = () => {
      setIconsReady(true);
    };
    loadIcons();
  }, []);

  const services = [
    { icon: FaBuilding, name: 'Real Estate', link: '/services/real-estate' },
    { icon: FaBolt, name: 'Energy', link: '/services/energy' },
    { icon: FaMoneyBillWave, name: 'Financial Services', link: '/services/financial-services' },
    { icon: FaIndustry, name: 'Industrial Products', link: '/services/industrial-products' },
    { icon: FaCog, name: 'Technology, Media, & Entertainment', link: '/services/technology-media-entertainment' },
    { icon: FaTruck, name: 'Transportation & Logistics', link: '/services/transportation-logistics' },
    { icon: FaTools, name: 'Manufacturing', link: '/services/manufacturing' },
    { icon: FaWarehouse, name: 'Retail', link: '/services/retail' },
    { icon: FaLandmark, name: 'Supply Chain', link: '/services/supply-chain' },
    { icon: FaGraduationCap, name: 'Education', link: '/services/education' },
    { icon: FaChartLine, name: 'FMCG', link: '/services/fmcg' },
    { icon: FaTools, name: 'Construction', link: '/services/construction' },
  ];

  const ecommerceService = { icon: FaShoppingCart, name: 'E-commerce', link: '/services/e-commerce' };

  if (!iconsReady) {
    return <div>Loading...</div>; // Optionally display a loading state while icons are preloading
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Section */}
        <div className=" bg-white rounded-sm grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-black">How Can We Help You?</h2>
            <p className="mt-6 text-lg text-gray-600">
              By collaborating with private, public, and social organizations, we combine our global experience with local insights to create real and sustainable change for your business.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold text-black text-center">What is Your Business Needing?</h2>
            <h2 className="text-1xl font-bold text-black text-center mt-4">Software For:</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 w-full">
              {services.slice(0, 4).map((service) => {
                const Icon = service.icon;
                return (
                  <Link href={service.link} key={service.name} className="group">
                    <div className="flex items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 shadow-sm">
                      <Icon className="w-8 h-8 text-black mr-3 flex-shrink-0" /> {/* Ensure icon size and non-shrink */}
                      <span className="font-medium text-gray-700 text-sm md:text-base break-words leading-tight">{service.name}</span> {/* Dynamic text size */}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <button onClick={toggleModal} className="px-8 py-4 bg-black text-white rounded-md">More</button>
            </div>
          </div>
        </div>

        {/* Modal for More Services */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white p-8 rounded-lg max-w-3xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">All Services</h3>
                <button onClick={toggleModal} className="text-black text-lg">&times;</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link href={service.link} key={service.name} className="group">
                      <div className="flex items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 shadow-sm">
                        <Icon className="w-8 h-8 text-black mr-3 flex-shrink-0" /> {/* Ensure icon size and non-shrink */}
                        <span className="font-medium text-gray-700 text-sm md:text-base break-words leading-tight">{service.name}</span> {/* Dynamic text size */}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-center">
                <Link href={ecommerceService.link} className="group">
                  <div className="flex items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 shadow-sm">
                    <ecommerceService.icon className="w-8 h-8 text-black mr-3 flex-shrink-0" /> {/* Ensure icon size and non-shrink */}
                    <span className="font-medium text-gray-700 text-sm md:text-base break-words leading-tight">{ecommerceService.name}</span>
                  </div>
                </Link>
              </div>
              <div className="mt-6 text-center">
                <button onClick={toggleModal} className="px-8 py-4 bg-black text-white rounded-md">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
