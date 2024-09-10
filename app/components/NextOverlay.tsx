'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai'; // Importing a forward arrow icon from react-icons

export default function NextOverlay({ nextArticleSlug }: { nextArticleSlug: string }) {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200 && window.innerWidth > 640) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Set the initial state
    handleResize();

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {!isSmallScreen && (
        <div
          onClick={() => router.push(`/articles/${nextArticleSlug}`)}
          className="fixed top-0 right-0 h-full w-1/8 z-40 cursor-pointer flex items-center justify-center group"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-purple-200 via-blue-200 to-transparent opacity-0 group-hover:opacity-80 backdrop-blur-lg transition-all duration-300"></div>
          <span className="text-gray-700 text-8xl font-extrabold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-90">
            NEXT
          </span>
        </div>
      )}

      {/* "Forward Arrow" button that appears when the screen is not full-screen but not on mobile */}
      {isSmallScreen && (
        <div
          onClick={() => router.push(`/articles/${nextArticleSlug}`)}
          className="fixed bottom-4 right-4 z-50 flex items-center justify-center bg-blue-100 text-gray-700 rounded-full p-4 cursor-pointer transition-transform transform hover:scale-110"
        >
          <AiOutlineArrowRight className="text-2xl" />
        </div>
      )}
    </>
  );
}
