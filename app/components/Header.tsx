'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { FaPhone } from 'react-icons/fa';

interface HeaderProps {
    isDarkMode?: boolean; // Add a prop to control the theme
}

export default function Header({ isDarkMode = true }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={`relative z-20 flex justify-between items-center px-6 py-0 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
            <div className="flex items-center">
                <Link href="/" legacyBehavior>
                    <a>
                        <Image
                            src="/elevate-logo.png"
                            alt="Elevate Logo"
                            width={100}
                            height={40}
                            className={isDarkMode ? 'invert' : ''} // Invert logo for dark mode
                        />
                    </a>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center space-x-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <Link legacyBehavior href="/services">
                    <a>Services</a>
                </Link>
                <Link legacyBehavior href="/articles">
                    <a>Articles</a>
                </Link>
                <Link legacyBehavior href="/about">
                    <a>About</a>
                </Link>
                <Link legacyBehavior href="/pricing">
                    <a>Pricing</a>
                </Link>
                <Link legacyBehavior href="/contact">
                    <a>Contact</a>
                </Link>
                <div className="flex space-x-4 ml-4 items-center">
                    <Link legacyBehavior href="/login">
                        <a className={`px-4 py-2 border ${isDarkMode ? 'border-white' : 'border-black'} rounded`}>
                            Login
                        </a>
                    </Link>
                    <Link legacyBehavior href="/register">
                        <a className={`px-4 py-2 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded`}>
                            Register
                        </a>
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="{isDarkMode ? 'text-white' : 'text-black'} focus:outline-none">
                    {menuOpen ? (
                        <XIcon className="h-6 w-6" />
                    ) : (
                        <MenuIcon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation - Full Screen Overlay */}
            <div
                className={`fixed inset-0 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-30 flex flex-col justify-center items-center`}
            >
                <button
                    onClick={toggleMenu}
                    className={`absolute top-4 right-4 ${isDarkMode ? 'text-white' : 'text-black'} focus:outline-none`}
                >
                    <XIcon className="h-6 w-6" />
                </button>
                <nav className="grid gap-2 grid-cols-3 grid-rows-3 w-full max-w-xs text-xl">
                    <Link legacyBehavior href="/services">
                        <a className="col-span-2 row-span-1 text-center px-4 py-4 bg-blue-600 hover:bg-blue-700 border border-blue-500 rounded-md">
                            Services
                        </a>
                    </Link>
                    <Link legacyBehavior href="/articles">
                        <a className="col-span-1 row-span-3 text-center px-4 py-4 bg-green-600 hover:bg-green-700 border border-green-500 rounded-md">
                            Articles
                        </a>
                    </Link>
                    <Link legacyBehavior href="/about">
                        <a className="col-span-1 row-span-1 text-center px-4 py-4 bg-red-600 hover:bg-red-700 border border-red-500 rounded-md">
                            About
                        </a>
                    </Link>
                    <Link legacyBehavior href="/pricing">
                        <a className="col-span-1 row-span-1 text-center px-4 py-4 bg-yellow-600 hover:bg-yellow-700 border border-yellow-500 rounded-md">
                            Pricing
                        </a>
                    </Link>
                    <Link legacyBehavior href="/contact">
                        <a className="col-span-2 row-span-1 text-center px-4 py-4 bg-purple-600 hover:bg-purple-700 border border-purple-500 rounded-md">
                            Contact
                        </a>
                    </Link>
                </nav>
                <div className="flex space-x-2 mt-4 w-full max-w-xs ">
                    <Link legacyBehavior href="/login">
                        <a className={`w-1/2 text-center px-4 py-2 border ${isDarkMode ? 'border-white' : 'border-black'} rounded-md`}>
                            Login
                        </a>
                    </Link>
                    <Link legacyBehavior href="/register">
                        <a className={`w-1/2 text-center px-4 py-2 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-md`}>
                            Register
                        </a>
                    </Link>
                </div>
                {/* Phone Button Below Login/Register */}
                <div className="w-full max-w-xs mt-4 px-4">
                    <a href="tel:+18135305847" className={`flex items-center justify-center w-full border ${isDarkMode ? 'border-white' : 'border-black'} rounded-md ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'} px-4 py-2`}>
                        <FaPhone className="w-4 h-4 mr-2" />
                        Call +1(813) 530-5847
                    </a>
                </div>
            </div>
        </header>
    );
}
