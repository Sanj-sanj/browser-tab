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
  desktopContext: { title: "", id: "", dir: "", e: "", onClick: () => {} },
  dirs: {
    recent: [],
    starred: [
      {
        title: "JS Racer",
        icon: null,
        handleDoubleClick: openJSRacer,
        handleContextMenu: desktopContext,
        id: "001",
        type: "app",
      },
      {
        title: "Brave Web Browser",
        icon: Browser,
        handleDoubleClick: openBrave,
        handleContextMenu: desktopContext,
        id: "002",
        type: "app",
      },
    ],
    desktop: [
      {
        title: "JS Racer",
        icon: null,
        handleDoubleClick: openJSRacer,
        handleContextMenu: desktopContext,
        id: "001",
        type: "app",
      },
      {
        title: "Brave Web Browser",
        icon: Browser,
        handleDoubleClick: openBrave,
        handleContextMenu: desktopContext,
        id: "002",
        type: "app",
      },
    ],
    documents: [
      {
        title: "Brave Web Browser",
        icon: Browser,
        handleDoubleClick: openBrave,
        handleContextMenu: desktopContext,
        id: "001",
        type: "app",
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
      // if (payload.whichDir.includes("/")) {
      //   const path = payload.whichDir.split("/");
      //   let startDir = path.shift();
      //   let destination = state.dirs[startDir]; //start point (state.dirs.desktop, state.dirs.videos)
      //   console.log(destination, path);
      //   for (let i = 0; i < path.length; i++) {
      //     const oneDirDeeper = destination.find((obj) => obj[path[i]]);
      //     if (!path[i + 1] && !oneDirDeeper[path[i]].length) {
      //       oneDirDeeper[path[i]].push(
      //         {
      //           title: payload.title,
      //           /* eslint-disable-next-line*/
      //           icon: () => (
      //             <img className="w-16" src={folder} alt="icon of a folder" />
      //           ),
      //           id: payload.id,
      //           handleDoubleClick: payload.handleDoubleClick,
      //           handleContextMenu: desktopContext,
      //           type: "folder",
      //         },
      //         { [payload.title]: [] }
      //       );
      //     }
      //     destination = destination[path[i]];
      //   }
      //   return { ...state };
      //   console.log(destination);
      // }
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
                id: payload.id,
                handleDoubleClick: payload.handleDoubleClick,
                handleContextMenu: desktopContext,
                type: "folder",
              },
              {
                [payload.title]: [],
              },
            ],
          },
        };
      }
      return { ...state };
    case "renameItem":
      // if(payload.dir.includes('/')) {
      //   const path =payload.dir.split('/')
      //   const destination = state.dirs[path[0]]
      //   const folder = state.dirs[[path[0]]][path[1]]
      //   folder.find(obj => )
      // }
      if (payload.dir) {
        const destination = payload.dir;
        const toModify = state.dirs[destination].find(
          (obj) => obj.id === payload.id
        );
        toModify.title = payload.newTitle;
        const returnVal = [...state.dirs[destination]];
        console.log(returnVal);
        return {
          ...state,
          dirs: {
            ...state.dirs,
            [destination]: [...returnVal],
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
