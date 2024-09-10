'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBuilding, FaIndustry, FaMoneyBillWave, FaBolt, FaCog, FaGraduationCap, FaShoppingCart, FaTruck, FaTools, FaWarehouse, FaLandmark, FaChartLine } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

type IconType = typeof FaBuilding;

interface Service {
    title: string;
    description: string;
    icon: IconType;
}

const servicesData: Record<string, Service> = {
    'real-estate': {
        title: 'Real Estate Software Development',
        description: 'Our team provides tailored real estate software solutions for property management, listings, and client engagement. Increase efficiency with our modern platforms.',
        icon: FaBuilding,
    },
    'energy': {
        title: 'Energy Management Systems',
        description: 'We build custom energy management software that helps streamline operations, optimize resource use, and improve data insights in the energy sector.',
        icon: FaBolt,
    },
    'financial-services': {
        title: 'Financial Services Software Solutions',
        description: 'We offer secure and scalable financial platforms that cover everything from online banking solutions to investment management systems.',
        icon: FaMoneyBillWave,
    },
    'industrial-products': {
        title: 'Industrial Products Software',
        description: 'Develop software that automates processes and provides data analytics for companies in the industrial sector, from manufacturing to logistics.',
        icon: FaIndustry,
    },
    'technology-media-entertainment': {
        title: 'Tech, Media, & Entertainment Solutions',
        description: 'Our software solutions for tech, media, and entertainment industries help manage content, track performance, and deliver exceptional customer experiences.',
        icon: FaCog,
    },
    'transportation-logistics': {
        title: 'Transportation & Logistics Management Software',
        description: 'Optimize routes, manage fleets, and track shipments with our logistics software tailored for the transportation industry.',
        icon: FaTruck,
    },
    'manufacturing': {
        title: 'Manufacturing Software Solutions',
        description: 'We create ERP systems and software that streamline manufacturing processes, improve supply chain management, and boost production efficiency.',
        icon: FaTools,
    },
    'retail': {
        title: 'Retail Software Solutions',
        description: 'From e-commerce platforms to point-of-sale systems, we develop software that enhances customer experience and business operations in the retail sector.',
        icon: FaWarehouse,
    },
    'supply-chain': {
        title: 'Supply Chain Management Software',
        description: 'Track shipments, manage inventories, and optimize your supply chain with our custom-built solutions.',
        icon: FaLandmark,
    },
    'education': {
        title: 'Education Management Software',
        description: 'We build software for education institutions that enhances learning management systems, tracks student progress, and supports online education platforms.',
        icon: FaGraduationCap,
    },
    'fmcg': {
        title: 'FMCG Software Solutions',
        description: 'Our fast-moving consumer goods (FMCG) software solutions focus on inventory management, sales tracking, and data-driven decision-making.',
        icon: FaChartLine,
    },
    'construction': {
        title: 'Construction Management Software',
        description: 'Track projects, manage resources, and improve communication with our construction management software.',
        icon: FaTools,
    },
    'e-commerce': {
        title: 'E-Commerce Software Solutions',
        description: 'We develop powerful e-commerce platforms that drive sales, enhance user experience, and integrate seamlessly with payment gateways and shipping systems.',
        icon: FaShoppingCart,
    },
    'other': {
        title: 'Other Software Solutions',
        description: 'Have a unique business need? We provide tailored software solutions for niche industries. Let’s talk and create a customized solution for you.',
        icon: FaCog,
    },
};

export default function ServiceDetails() {
    const { id } = useParams();
    const [service, setService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (typeof id === 'string' && servicesData[id]) {
            setService(servicesData[id]);
        }
    }, [id]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header isDarkMode={false} />
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center p-8">
                <div className="flex items-center mb-6">
                    <service.icon className="w-10 h-10 text-black mr-4" />
                    <h1 className="text-4xl font-semibold">{service.title}</h1>
                </div>
                <p className="text-xl mb-8">{service.description}</p>

                {/* Let's Work Together Button */}
                <div className="mt-8">
                    <button
                        onClick={toggleModal}
                        className="px-8 py-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                    >
                        Let's Work Together!
                    </button>
                </div>

                {/* Modal for Contact or Registration */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <div className="flex justify-center mb-4">
                                <h3 className="text-2xl font-bold text-center">Get Started</h3>
                            </div>
                            <p className="mb-6 text-left">
                                Would you like to contact us for more information or register and get started?
                            </p>
                            <div className="flex justify-center space-x-4">
                                <Link href="/contact" legacyBehavior>
                                    <a className="px-4 py-2 bg-white text-black border border-black rounded-md hover:bg-gray-200 transition-colors duration-200">
                                        Contact Us
                                    </a>
                                </Link>
                                <Link href="/register" legacyBehavior>
                                    <a className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
                                        Register
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <Footer />
        </div>
    );
}