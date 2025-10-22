import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#D7BFAE",
        cream: "#F5F5DC",
        darkBlue: "#1A3A52",
        lightGold: "#D4AF37",
        darkGold: "#B8941F",
        sage: "#9CAF88",
        "text-dark": "#2B2B2B",
        "text-gray": "#4B5563",
        "border-light": "#E8E8E8",
      },
      fontFamily: {
        inter: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
      aspectRatio: {
        "2/3": "2 / 3",
      },
    },
  },
  corePlugins: {
    // Enable all default core plugins for better browser support
  },
  plugins: [],
};
export default config;
