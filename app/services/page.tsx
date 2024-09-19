'use client';

import { FaBuilding, FaIndustry, FaMoneyBillWave, FaBolt, FaCog, FaGraduationCap, FaShoppingCart, FaTruck, FaTools, FaWarehouse, FaLandmark, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    { icon: FaShoppingCart, name: 'E-Commerce', link: '/services/e-commerce' },
    { icon: FaCog, name: 'Other', link: '/services/other' }, // Added the "Other" button
];

export default function ServicesDashboard() {
    return (
        <div className="min-h-screen mt-2">
            <Header isDarkMode={false} />

            <div className="max-w-6xl mx-auto p-8">
                <h1 className="text-4xl font-semibold mb-10 text-center">Our Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <Link href={service.link} key={service.name} className="group">
                            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 shadow-sm h-40 w-full">
                                <service.icon className="w-10 h-10 text-black mb-2" />
                                {/* Wrapping and center-aligning long text */}
                                <span className="text-xl font-semibold text-center text-gray-700">{service.name}</span>
                                <span className="text-sm text-gray-500">Learn More</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
