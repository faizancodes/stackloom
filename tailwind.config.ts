import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "#7C3AED",
        surface: {
          level0: "#0a0a0a",
          level1: "#0f0f0f",
          level2: "#111111",
          level3: "#141414",
        },
      },
    },
  },
  plugins: [],
};

export default config;
