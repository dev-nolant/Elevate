"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ElevateDivider() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    // Set initial position super far to the left
    gsap.set(wrapper, { x: '-200%' });

    let scrollVelocity = 0;

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        scrollVelocity = velocity;

        gsap.to(wrapper, {
          x: `+=${scrollVelocity / 65}`, // Increased divisor for slower movement
          ease: "none",
          overwrite: true,
          modifiers: {
            x: (x) => {
              const width = wrapper.scrollWidth / 2; // Half the width of the content
              return `${parseFloat(x) % width}px`;
            }
          },
          duration: 0,
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section className="elevate-section overflow-hidden py-8">
      <div 
        className="elevate-wrapper whitespace-nowrap text-8xl font-bold text-black"
        ref={wrapperRef}
        style={{ display: 'flex', willChange: 'transform' }}
      >
        {/* Repeat the text a sufficient number of times to create the illusion of infinity */}
        {Array(100).fill("ELEVATE ").join("")}
      </div>
    </section>
  );
}

export default ElevateDivider;
