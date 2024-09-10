import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Importing icons

interface InfoProps {
    className?: string; // Allow optional className prop
}

const Info: React.FC<InfoProps> = ({ className }) => {
    return (
        <div className={`flex flex-col items-center p-4 ${className}`}>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center'>
                    <a href="mailto:nolan@elevate.codes" className='mr-4 text-white text-sm'>
                        info@elevate.codes
                    </a>
                    <a href="tel:+18135305847" className='hidden md:block text-white text-sm'> {/* Hide on mobile */}
                        +1(813) 530-5847
                    </a>
                </div>
                <div className='flex space-x-4'>
                    <a href='https://www.linkedin.com/company/elevate-codes/' target='_blank' rel='noopener noreferrer'>
                        <FaLinkedin className='w-5 h-5 text-white' />
                    </a>
                    <a href='https://github.com/elevatecodes' target='_blank' rel='noopener noreferrer'>
                        <FaGithub className='w-5 h-5 text-white' />
                    </a>
                </div>
            </div>
            {/* Thin Light Gray Bar - Full Width */}
            <div className='mt-2 w-screen h-[1px] bg-gray-600'></div> {/* Use w-screen for full width */}
        </div>
    );
};

export default Info;
