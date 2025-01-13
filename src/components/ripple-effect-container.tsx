"use client";

import "jquery";
import $ from "jquery";
import "jquery.ripples";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    jQuery: JQueryStatic;
  }
}

const RippleEffectComponent = () => {
  const rippleRef = useRef(null);

  // Function to generate random ripples
  const createRandomRipples = () => {
    if (!rippleRef.current) return;

    const width = $(rippleRef.current).width() || 0;
    const height = $(rippleRef.current).height() || 0;

    // Randomize position and strength of the ripple
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 30 + Math.random() * 50; // Random radius between 20 and 30
    const strength = 0.03 + Math.random() * 0.05; // Random strength between 0.02 and 0.05

    // @ts-expect-error - jquery.ripples type definitions are not available
    $(rippleRef.current).ripples("drop", x, y, radius, strength);
  };

  useEffect(() => {
    window.jQuery = $; // Expose jQuery globally
    if (rippleRef.current) {
    // @ts-expect-error - jquery.ripples type definitions are not available
      $(rippleRef.current).ripples({
        resolution: 512,
        dropRadius: 20, // Size of ripple
        perturbance: 0.04, // Viscosity of water
      });

      // Set an interval to continuously create ripples
      const interval = setInterval(createRandomRipples, 200); // Every 500ms

      // Cleanup on unmount
      return () => {
        clearInterval(interval);
        if (rippleRef.current) {
              // @ts-expect-error - jquery.ripples type definitions are not available
          $(rippleRef.current).ripples("destroy");
        }
      };
    }
  }, []);

  return (
    <div
      ref={rippleRef}
      className="relative flex h-screen w-full items-center justify-center bg-zinc-900"
    >
      <h1 className="text-4xl font-bold text-black">Water Ripple Effect</h1>
    </div>
  );
};

export default RippleEffectComponent;
