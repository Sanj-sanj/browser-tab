import { createContext } from "react";
import Browser from "../components/svg/Browser";
/* eslint-disable-next-line */
import folder from "url:../images/folders/folder.png";
import { openJSRacer, openBrave, desktopContext } from "../js/dispatch";

export const UserContext = createContext({
  user: "Guest",
  wifi: true,
  activeView: true,
  volume: 50,
  display: 10,
  apps: [],
  background: "Mountain",
  desktopContext: { title: "", onClick: () => {} },
  dirs: {
    recent: [],
    starred: [
      {
        title: "JS Racer",
        icon: null,
        handleDoubleClick: openJSRacer,
        handleContextMenu: desktopContext,
      },
      {
        title: "Brave Web Browser",
        icon: Browser,
        handleDoubleClick: openBrave,
        handleContextMenu: desktopContext,
      },
    ],
    desktop: [
      {
        title: "JS Racer",
        icon: null,
        handleDoubleClick: openJSRacer,
        handleContextMenu: desktopContext,
      },
      {
        title: "Brave Web Browser",
        icon: Browser,
        handleDoubleClick: openBrave,
        handleContextMenu: desktopContext,
      },
    ],
    documents: [
      {
        title: "Brave Web Browser",
        icon: Browser,
        handleDoubleClick: openBrave,
        handleContextMenu: desktopContext,
      },
    ],
    downloads: [],
    music: [],
    pictures: [],
    videos: [],
    trash: [],
  },
});

export const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "updateUser":
      return { ...state, user: payload };
    case "toggleWifi":
      return { ...state, wifi: payload };
    case "updateVolume":
      return { ...state, volume: payload };
    case "updateDisplay":
      return { ...state, display: payload };
    case "updateActiveView":
      return { ...state, activeView: payload };
    case "changeBackground":
      return { ...state, background: payload };
    case "changeDesktopContext":
      return { ...state, desktopContext: payload };
    case "mkdir":
      if (payload.whichDir) {
        const destination = payload.whichDir;
        return {
          ...state,
          dirs: {
            ...state.dirs,
            [destination]: [
              ...state.dirs[destination],
              {
                title: payload.title,
                /*eslint-disable-next-line*/
                icon: () => (
                  <img className="w-16" src={folder} alt="icon of a folder" />
                ),
                handleDoubleClick: payload.handleDoubleClick,
                handleContextMenu: desktopContext,
              },
            ],
          },
        };
      }
      return { ...state };
    case "cdOpenApp":
      if (state.apps.some((app) => app.id === payload.id)) {
        const newAppState = state.apps.map((app) => {
          if (app.id === payload.id) app.dir = payload.dir;
          return app;
        });
        return { ...state, apps: newAppState };
      }
      return { ...state };
    case "openApp":
      return { ...state, apps: [...state.apps, payload] };
    case "closeApp":
      if (state.apps.some((app) => app.id == payload.id)) {
        const newAppState = state.apps.map((app) => {
          if (app.id === payload.id) {
            app.active = false;
          }
          return app;
        });
        return { ...state, apps: newAppState };
      }
      return { ...state };
    default:
      break;
  }
};
