import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-main": "#0e1217",
        "secondary-main": "#1C1F26",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(to bottom left,rgb(255, 255, 255,0.05),transparent,transparent,#0e1217)",
      },
      screens: {
        xl: "1400px",
        lg: "1200px",
        rg: "1000px",
        md: "800px",
        sm: "600px",
        xs: "300px",
      },
      fontWeight: {
        b: "700",
        sb: "600",
        mb: "500",
        r: "400",
        l: "300",
      },
      fontSize: {
        "3xl": "60px",
        "2xl": "40px",
        xl: "28px",
        lg: "21px",
        rg: "18px",
        md: "16px",
        sm: "15px",
        xs: "14px",
        "2xs": "13px",
        "3xs": "12px",
      },
    },
  },
  plugins: [],
};
export default config;
