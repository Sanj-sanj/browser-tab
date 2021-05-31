import { v4 as uuid } from "uuid";
const openJSRacer = (dispatch) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "Javascript-Racer",
      src: "https://js-racer-clone.herokuapp.com/",
      active: true,
      id: uuid(),
    },
  });
export { openJSRacer };
