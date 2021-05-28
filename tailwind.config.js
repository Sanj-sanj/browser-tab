module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "bounce-in": "bounce-in 500ms ",
      },
      keyframes: {
        "bounce-in": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
      },
      inset: {
        "1/5": "20%",
        "1/10": "10%",
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
