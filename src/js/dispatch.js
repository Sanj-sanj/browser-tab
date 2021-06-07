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

const openSettings = (dispatch) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "Settings",
      src: null,
      active: true,
      id: uuid(),
    },
  });

const openNewFolder = (dispatch) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "New Folder",
      src: null,
      active: true,
      id: uuid(),
    },
  });

const toggleWifi = (dispatch, wifi) =>
  dispatch({ type: "toggleWifi", payload: !wifi });

const mkdir = (dispatch, title, handleDoubleClick) => {
  dispatch({
    type: "mkdir",
    payload: {
      title: title,
      handleDoubleClick: handleDoubleClick,
    },
  });
};

const desktopContext = (dispatch, value, onClick) => {
  dispatch({
    type: "changeDesktopContext",
    payload: { title: value, onClick: onClick },
  });
};

const clearDesktopContext = (dispatch) =>
  dispatch({
    type: "changeDesktopContext",
    payload: { title: "", onClick: () => {} },
  });

export {
  openJSRacer,
  openSettings,
  openNewFolder,
  toggleWifi,
  mkdir,
  desktopContext,
  clearDesktopContext,
};
