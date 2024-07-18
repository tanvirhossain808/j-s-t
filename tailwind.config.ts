import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "MontserratAlternates": ["MontserratAlternates", "sans-serif"],
        "MontserratAlternates-Bold": ["MontserratAlternates-Bold", "sans-serif"]
      },
      gridTemplateColumns: {
        "auto": 'repeat(auto-fill, minmax(300px, 1fr))',
        "sm-auto": 'repeat(auto-fill, minmax(200px, 1fr))',
      }
    },
  },
  plugins: [],
};
export default config;
