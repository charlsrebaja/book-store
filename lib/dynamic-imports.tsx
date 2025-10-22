import dynamic from "next/dynamic";
import React from "react";

/**
 * Lazy load Framer Motion to reduce initial bundle size
 * Framer Motion is only needed on pages with animations
 */

export const DynamicMotionDiv = dynamic(
  async () => {
    const { motion } = await import("framer-motion");
    return { default: motion.div };
  },
  {
    loading: () => null,
    ssr: false,
  }
);

export const DynamicMotionSection = dynamic(
  async () => {
    const { motion } = await import("framer-motion");
    return { default: motion.section };
  },
  {
    loading: () => null,
    ssr: false,
  }
);

export const DynamicMotionButton = dynamic(
  async () => {
    const { motion } = await import("framer-motion");
    return { default: motion.button };
  },
  {
    loading: () => null,
    ssr: false,
  }
);

/**
 * Lazy load admin components (heavy and rarely used)
 */

/**
 * Lazy load admin components (heavy and rarely used)
 * AdminDashboard can be added when the component is created
 */

/**
 * Lazy load modal and heavy components
 * ImageUploadModal can be added when the component is created
 */

/**
 * Loading component - Used for loading states in lazy-loaded components
 */
export function LoadingSpinner({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin">
        <span className="text-gray-500">{text}</span>
      </div>
    </div>
  );
}
