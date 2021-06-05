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
const mkdir = (dispatch, title, handleContextMenu) => {
  console.log(handleContextMenu);
  dispatch({
    type: "mkdir",
    payload: {
      title: { title },
      handleContextMenu: handleContextMenu,
    },
  });
};
const desktopContext = (dispatch, value, onClick) => {
  // console.log(dispatch, value, onClick);
  dispatch({
    type: "changeDesktopContext",
    payload: { title: value, onClick: onClick },
  });
};

export { openJSRacer, openSettings, openNewFolder, mkdir, desktopContext };
