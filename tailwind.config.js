module.exports = {
  purge: ["./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "bounce-in": "bounce-in 500ms ",
        "slide-in-left": "slide-in-left 150ms ease-out",
        "slide-out-left": "slide-out-left 150ms ease-out",
        "slide-in-right": "slide-in-right 150ms ease-out",
        "slide-out-right": "slide-out-right 150ms ease-out",
        "pop-out-inside": "pop-out-inside 200ms ease-out",
        "pop-in-outside": "pop-in-outside 200ms ease-out",
      },
      keyframes: {
        "bounce-in": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
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
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pop-in-outside": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0)", opacity: "0" },
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
