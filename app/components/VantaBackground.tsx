'use client';

import { useEffect, useRef } from 'react';

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect: any; // Explicitly typing the vantaEffect as 'any'
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.halo.min.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      vantaEffect = window.VANTA.HALO({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        backgroundColor: 0xffffff, // White background
        baseColor: 0x000000, // Base color for the halo
        size: 1.2,
        amplitudeFactor: 1.0,
      });
    };

    document.body.appendChild(script);

    return () => {
      if (vantaEffect) vantaEffect.destroy();
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={vantaRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default VantaBackground;
