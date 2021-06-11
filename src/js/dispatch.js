import { v4 as uuid } from "uuid";
const openJSRacer = (dispatch) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "Javascript-Racer",
      type: "iframe",
      src: "https://js-racer-clone.herokuapp.com/",
      active: true,
      id: uuid(),
    },
  });
const openBrave = (dispatch) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "Brave Web Browser",
      type: "iframe",
      src: "https://www.google.com/search?igu=1",
      active: true,
      id: uuid(),
    },
  });

const openSettings = (dispatch) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "Settings",
      type: "Settings",
      src: null,
      active: true,
      id: uuid(),
    },
  });
const openFiles = (dispatch, location) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "Files",
      type: "Files",
      dir: location,
      src: null,
      active: true,
      id: uuid(),
    },
  });

const openNewFolderApp = (dispatch, newDir) =>
  dispatch({
    type: "openApp",
    payload: {
      title: "New Folder",
      type: "New Folder",
      dir: newDir,
      src: null,
      active: true,
      id: uuid(),
    },
  });

const toggleWifi = (dispatch, wifi) =>
  dispatch({ type: "toggleWifi", payload: !wifi });

const mkdir = (dispatch, title, whichDir, handleDoubleClick) => {
  dispatch({
    type: "mkdir",
    payload: {
      title: title,
      handleDoubleClick: handleDoubleClick,
      whichDir: whichDir,
      id: uuid(),
    },
  });
};
const cdOpenApp = (dispatch, id, dir) => {
  dispatch({
    type: "cdOpenApp",
    payload: { id, dir },
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
  openBrave,
  openSettings,
  openNewFolderApp,
  openFiles,
  toggleWifi,
  mkdir,
  cdOpenApp,
  desktopContext,
  clearDesktopContext,
};
