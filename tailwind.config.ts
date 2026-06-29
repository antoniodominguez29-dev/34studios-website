import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        bone: "#f5f5f0",
        smoke: "#8c8c86",
        graphite: "#181818",
        line: "rgba(245,245,240,0.14)"
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        editorial: ["Georgia", "Times New Roman", "serif"]
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-1%, 1%)" },
          "50%": { transform: "translate(1%, -1%)" },
          "75%": { transform: "translate(-0.5%, -0.5%)" }
        }
      },
      animation: {
        reveal: "reveal 900ms ease-out both",
        grain: "grain 9s steps(6) infinite"
      }
    }
  },
  plugins: []
};

export default config;
