/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        centra: "Centra",
        burtons: "burtons",
      },
      colors: {
        "body-bg": "#121212",
        "welcome-text1": "#aa367c",
        "welcome-text2": "#4a2fbd",
        "skill-bg": "#151515",
        "react-blue": "#61DBFB",
        "typescript-blue": "#007ACC",
        "javascript-yellow": "#F7DF1E",
        "bootstrap-purple": "#7952B3",
        "tailwind-blue": "#38B2AC",
        "sass-pink": "#CC6699",
        "styled-components-pink": "#DB7093",
        "angular-red": "#DD0031",
        "linkedin-blue": "#0077B5",
        "twitter-blue": "#1DA1F2",
        "web3-text1": "#7928ca",
        "web3-text2": "#ff0080",
        "astro-blue": "#0d0f14",
      },
      backgroundImage: {
        banner: "url('/src/assets/images/banner-bg.png')",
      },
      animation: {
        type: "type 2.7s ease-out .8s infinite alternate both",
        updown: "updown 3s linear infinite",
        wave: "wave 2.5s infinite",
      },
      keyframes: {
        type: {
          "0%": { transform: "translateX(0ch)" },
          "5%, 10%": { transform: "translateX(1ch)" },
          "15%, 20%": { transform: "translateX(2ch)" },
          "25%, 30%": { transform: "translateX(3ch)" },
          "35%, 40%": { transform: "translateX(4ch)" },
          "45%, 50%": { transform: "translateX(5ch)" },
          "55%, 60%": { transform: "translateX(6ch)" },
          "65%, 70%": { transform: "translateX(7ch)" },
          "75%, 80%": { transform: "translateX(8ch)" },
          "85%, 90%": { transform: "translateX(9ch)" },
          "95%, 100%": { transform: "translateX(11ch)" },
        },
        updown: {
          "0%": { transform: "translateY(-20px)" },
          "50%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(-20px)" },
        },
        wave: {
          "0%": { transform: "rotate( 0.0deg)" },
          "10%": { transform: "rotate(14.0deg)" },
          "20%": { transform: "rotate(-8.0deg)" },
          "30%": { transform: "rotate(14.0deg)" },
          "40%": { transform: "rotate(-4.0deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate( 0.0deg)" },
          "100%": { transform: "rotate( 0.0deg)" },
        },
      },
    },
  },
  plugins: [forms],
  safelist: [
    {
      pattern: /bg-+/,
      variants: ["hover", "focus"],
    },
    {
      pattern: /text-+/,
      variants: ["hover", "focus"],
    },
  ],
};
