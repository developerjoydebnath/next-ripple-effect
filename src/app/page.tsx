"use client";

import dynamic from "next/dynamic";
import "tailwindcss/tailwind.css";

const RippleEffect = dynamic(() => import("@/components/ripple-effect-container"), {
  ssr: false,
});

export default RippleEffect;
