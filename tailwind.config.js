module.exports = {
  purge: {
    content: ["./src/**/*.js"],
    safelist: [
      "bg-opacity-0",
      "bg-opacity-10",
      "bg-opacity-20",
      "bg-opacity-30",
      "bg-opacity-40",
      "bg-opacity-50",
      "bg-opacity-60",
      "bg-opacity-70",
      "bg-opacity-80",
      "bg-opacity-90",
      "bg-opacity-100",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "bounce-in": "bounce-in 500ms ",
        "slide-out-top": "slide-out-top 750ms ",
        "slide-in-top": "slide-in-top 750ms ",
        "slide-out-bottom": "slide-out-bottom 750ms ",
        "slide-in-bottom": "slide-in-bottom 750ms ",
        "slide-in-left": "slide-in-left 150ms ease-out",
        "slide-out-left": "slide-out-left 150ms ease-out",
        "slide-in-right": "slide-in-right 150ms ease-out",
        "slide-out-right": "slide-out-right 150ms ease-out",
        "pop-out-inside": "pop-out-inside 200ms ease-out",
        "pop-in-outside": "pop-in-outside 200ms ease-out",
        "fade-in": "fade-in 200ms ease-out",
        "fade-out": "fade-out 200ms ease-out",
        "drop-in": "drop-in 300ms ease-out",
      },
      keyframes: {
        "bounce-in": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        "slide-out-top": {
          "0%": { transform: "translateY(0%) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-100%) scale(0)", opacity: "0" },
        },
        "slide-in-top": {
          "0%": { transform: "translateY(-100%) scale(0)", opacity: "0" },
          "100%": { transform: "translateY(0%) scale(1)", opacity: "1" },
        },
        "slide-out-bottom": {
          "0%": { transform: "translateY(0em) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(400%) scale(0)", opacity: "0" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(400%) scale(0)", opacity: "0" },
          "100%": { transform: "translateY(0%) scale(1)", opacity: "1" },
        },
        "drop-in": {
          "0%": { transform: "translateY(-95%)", opacity: "0" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-6rem)", opacity: "0" },
          "100%": { transform: "translateX(0rem)", opacity: "1" },
        },
        "slide-out-left": {
          "0%": { transform: "translateX(0rem)", opacity: "1" },
          "100%": { transform: "translateX(-6rem)", opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(6rem)", opacity: "0" },
          "100%": { transform: "translateX(0rem)", opacity: "1" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0rem)", opacity: "1" },
          "100%": { transform: "translateX(6rem)", opacity: "0" },
        },
        "pop-out-inside": {
          "0%": { transform: "scale(0.75)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pop-in-outside": {
          "0%": { transform: "scale(1)", opacity: "0" },
          "100%": { transform: "scale(0.75)", opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      inset: {
        "1/5": "20%",
        "1/10": "10%",
      },
      spacing: {
        30: "7.5rem/*120px */",
        82: "21rem/*336px */",
        88: "22rem/*352px */",
        176: "44rem/*704px */",
      },
      transitionProperty: {
        "h-w": "height, width",
      },
      backgroundColor: {
        "pop-900": "#252220",
        "pop-850": "#2b2b2b",
        "pop-800": "#353535",
        "pop-700": "#4c4845",
        // 'pop-600': '#4c4845',
      },
      borderColor: {
        "pop-900": "#252220",
        "pop-850": "#2b2b2b",
        "pop-800": "#353535",
        "pop-700": "#4c4845",
        // 'pop-600': '#4c4845',
      },
    },
  },
  variants: {
    extend: {
      alignItems: ["last"],
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
  plugins: [],
};
