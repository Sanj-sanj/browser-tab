const openJSRacer = (dispatch) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "Javascript-Racer",
      src: "https://js-racer-clone.herokuapp.com/",
    },
  });
export { openJSRacer };
