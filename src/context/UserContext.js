import { createContext } from "react";
import CodeFile from "../components/svg/CodeFile";
import Bell from "../components/svg/Bell";
import { openJSRacer, desktopContext } from "../js/dispatch";

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
    desktop: [
      {
        title: "JS Racer",
        Svg: CodeFile,
        handleDoubleClick: openJSRacer,
        handleContextMenu: desktopContext,
      },
    ],
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
      return {
        ...state,
        dirs: {
          desktop: [
            ...state.dirs.desktop,
            {
              title: payload.title,
              Svg: Bell,
              handleDoubleClick: payload.handleDoubleClick,
              handleContextMenu: desktopContext,
            },
          ],
        },
      };
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
