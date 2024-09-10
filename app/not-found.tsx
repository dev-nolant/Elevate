'use client';

import { useEffect, useState } from 'react';
import './globals.css'; // Import the global CSS file

const Custom404 = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const pageX = window.innerWidth;
      const pageY = window.innerHeight;
      const centerX = pageX / 2;
      const centerY = pageY / 2;

      const offsetX = (event.pageX - centerX) / centerX * 20;
      const offsetY = (event.pageY - centerY) / centerY * 20;

      setMouseX(offsetX);
      setMouseY(offsetY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#28254C' }} // Darker purple background
    >
    <div className="box">
      <div className="box__ghost">
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>

        <div className="box__ghost-container">
          <div
            className="box__ghost-eyes"
            style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }}
          >
            <div className="box__eye-left"></div>
            <div className="box__eye-right"></div>
          </div>
          <div className="box__ghost-bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="box__ghost-shadow"></div>
      </div>

      <div className="box__description">
        <div className="box__description-container">
          <div className="box__description-title">Whoops!</div>
          <div className="box__description-text">
            It seems like we couldn't find the page you were looking for
          </div>
        </div>

        <a href="/" className="box__button">
          Go back
        </a>
      </div>
    </div>
    </div>
  );
};

export default Custom404;
