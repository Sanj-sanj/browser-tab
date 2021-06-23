import { createContext } from "react";
import Browser from "../components/svg/Browser";
/* eslint-disable-next-line */
import folder from "url:../images/folders/folder.png";
import {
  openJSRacer,
  openBrave,
  openFiles,
  desktopContext,
} from "../js/dispatch";
const folderIcon = () => (
  <img className="w-16" src={folder} alt="icon of a folder" />
);

export const UserContext = createContext({
  user: "Guest",
  wifi: true,
  activeView: "Lock",
  volume: 50,
  display: 10,
  apps: [],
  background: "Mountain",
  isFocused: {}, //app obj
  desktopContext: { title: "", id: "", dir: "", e: "", onClick: () => {} },
  dirs: {
    recent: [],
    starred: [
      {
        title: "Files",
        icon: folderIcon,
        handleDoubleClick: (d) => openFiles(d, "desktop"),
        handleContextMenu: desktopContext,
        id: "001",
        type: "app",
      },
      {
        title: "JS Racer",
        icon: null,
        handleDoubleClick: openJSRacer,
        handleContextMenu: desktopContext,
        id: "002",
        type: "app",
      },
      {
        title: "Brave Web Browser",
        icon: Browser,
        handleDoubleClick: openBrave,
        handleContextMenu: desktopContext,
        id: "003",
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
    case "isFocused":
      return { ...state, isFocused: payload.id };
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
      if (payload.whichDir.includes("/")) {
        const path = payload.whichDir.split("/");
        const startDir = path.shift();
        const path2 = [...path];
        const destination = state.dirs[startDir]; //start point (state.dirs.desktop, state.dirs.videos)
        let folder = [];
        const toAdd = [
          {
            title: payload.title,
            icon: folderIcon,
            id: payload.id,
            handleDoubleClick: payload.handleDoubleClick,
            handleContextMenu: desktopContext,
            type: "folder",
            dir: payload.whichDir,
          },
          {
            [payload.title]: [],
          },
        ];
        for (let i = 0; i < path.length; i++) {
          if (i > 0) {
            const thisDir = path2[i];
            // folder = folder.find((dir) => dir[thisDir])[thisDir];
            let temp = folder.find((dir) => dir[thisDir])[thisDir];
            temp ? (folder = temp) : null;
            break;
          }
          if (i === 0) {
            folder = destination.find((dir) => dir[path[i]])[path[i]];
          }
        }
        folder.push(...toAdd);
        return { ...state };
      }
      //old
      // if (payload.whichDir.includes("/")) {
      //   const path = payload.whichDir.split("/");
      //   const startDir = path.shift();
      //   const copyPath2 = [...path];
      //   let destination = state.dirs[startDir]; //start point (state.dirs.desktop, state.dirs.videos)
      //   let item;
      //   while (path.length) {
      //     const currDir = path.shift();
      //     item = !item
      //       ? destination.find((obj) => obj[currDir])[currDir]
      //       : item.find((obj) => obj[currDir])[currDir];
      //   }
      //   if (!path.length) {
      //     item = [
      //       ...item,
      //       {
      //         title: payload.title,
      //         icon: folderIcon,
      //         id: payload.id,
      //         handleDoubleClick: payload.handleDoubleClick,
      //         handleContextMenu: desktopContext,
      //         type: "folder",
      //         dir: payload.whichDir,
      //       },
      //       {
      //         [payload.title]: [],
      //       },
      //     ];
      //   }
      //   while (copyPath2.length) {
      //     const currDir = copyPath2.shift();
      //     const index = destination.indexOf(
      //       destination.find((obj) => obj[currDir])
      //     );
      //     destination[index][currDir] = item;
      //   }
      //   return { ...state };
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
                icon: folderIcon,
                id: payload.id,
                handleDoubleClick: payload.handleDoubleClick,
                handleContextMenu: desktopContext,
                type: "folder",
                dir: payload.whichDir,
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
      console.log(payload);
      if (payload.dir.includes("/")) {
        const path = payload.dir.split("/");
        const startingDir = path.shift();
        const destination = state.dirs[startingDir];
        let folder;
        for (let i = 0; i < path.length; i++) {
          console.log(`loop #${i}`, folder);
          folder = [...destination.find((obj) => obj[path[i]])[path[i]]];
        }
        console.log("end of loop", folder);
        const mutatedFile = folder.find((obj) => obj.id === payload.id);
        const file = { ...folder.find((obj) => obj.id === payload.id) };
        const mutatedDir = folder.find((obj) => obj[file.title]);
        const dir = { ...folder.find((obj) => obj[file.title]) };
        mutatedFile.title = payload.newTitle;
        mutatedFile.handleDoubleClick = () =>
          payload.dispatch({
            type: "openApp",
            payload: {
              title: "Files",
              type: "Files",
              dir: `${payload.dir}/${payload.newTitle}`,
              src: null,
              active: true,
              id: payload.id,
            },
          });
        const oldKey = Object.keys(mutatedDir);
        Object.assign(mutatedDir, { [payload.newTitle]: mutatedDir[oldKey] })[
          oldKey
        ];
        delete mutatedDir[oldKey];
        console.log("end of operation", folder);
        console.log("operation", { file, dir });
        //this shit mutates and shit not coolioli, we dont do that in react
        // let returnVal = [...destination]
        // for(let i =0; i < path.length; i++) {
        //   let tempFolder = [...destination.find((obj) => obj[path[i]])[path[i]]]
        //   returnVal = [...returnVal,   ]
        // }
        // console.log(folder.find((obj) => obj));

        return { ...state };
      }
      if (payload.dir) {
        const destination = payload.dir;
        const toModify = state.dirs[destination].find(
          (obj) => obj.id === payload.id
        );
        const renameObj = state.dirs[destination].find(
          (obj) => obj[toModify.title]
        );
        if (renameObj) {
          //if True file is a folder, need to rename the directory.
          //update the onclick handler otherwise it points to oldlocation due to closure
          //rename once, file opens fine, rename twice doesnt work unless you open somethign different
          console.log(toModify, destination);
          toModify.handleDoubleClick = () =>
            payload.dispatch({
              type: "openApp",
              payload: {
                title: "Files",
                type: "Files",
                dir: `${payload.dir}/${payload.newTitle}`,
                src: null,
                active: true,
                id: payload.id,
              },
            });
          const oldKey = Object.keys(renameObj);
          Object.assign(renameObj, { [payload.newTitle]: renameObj[oldKey] })[
            oldKey
          ];
          delete renameObj[oldKey];
        }

        toModify.title = payload.newTitle;
        const returnVal = [...state.dirs[destination]];
        return {
          ...state,
          apps: [...state.apps],
          dirs: {
            ...state.dirs,
            [destination]: [...returnVal],
          },
        };
      }
      return { ...state };
    case "moveItem":
      console.log(payload);
      if (payload.dir && payload.dir.includes("/")) {
        const path = payload.dir.split("/");
        const startingDir = path.shift();
        const destination = state.dirs[startingDir];
        let dir;
        for (let i = 0; i < path.length; i++) {
          dir = destination.find((obj) => obj[path[i]])[path[i]];
        }

        const file = dir.find((file) => file.id === payload.id);
        const folder = dir.find((dir) => dir[file.title]);
        for (let i = 0; i < path.length; i++) {
          destination.map((obj) => {
            if (obj[path[i]]) {
              const modifiedObj = obj[path[i]].filter((item) =>
                item === file || item === folder ? null : item
              );
              obj[path[i]] = modifiedObj;
            }
            return obj;
          });
        }
        file.dir = payload.newDir;

        const newDestinationReturnVal = [
          ...state.dirs[payload.newDir],
          file,
          folder,
        ];
        return {
          ...state,
          dirs: {
            ...state.dirs,
            [payload.newDir]: newDestinationReturnVal,
          },
        };
      }
      if (payload.dir) {
        const newDestination = payload.newDir;
        const destination = payload.dir;
        const fileToMove = state.dirs[destination].find(
          (obj) => obj.id === payload.id
        );
        const dirToMove = state.dirs[destination].find(
          (obj) => obj[fileToMove.title]
        );
        const modifiedDirReturnValue = state.dirs[destination].filter((obj) =>
          obj === fileToMove ? false : obj
        );

        fileToMove.dir = payload.newDir;
        let newDirReturnValue = [...state.dirs[newDestination], fileToMove];
        if (dirToMove) {
          //if the file is a dir, then we return the dir with the file, else just return the file
          newDirReturnValue = [
            ...state.dirs[newDestination],
            fileToMove,
            dirToMove,
          ];
        }
        return {
          ...state,
          dirs: {
            ...state.dirs,
            [destination]: [...modifiedDirReturnValue],
            [newDestination]: [...newDirReturnValue],
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
      return { ...state, apps: [...state.apps, payload], isFocused: payload };
    case "closeApp":
      if (state.apps.some((app) => app.id == payload.id)) {
        const newAppState = state.apps.map((app) => {
          if (app.id === payload.id) {
            app.active = false;
          }
          return app;
        });
        return { ...state, apps: newAppState, isFocused: {} };
      }
      return { ...state };
    default:
      break;
  }
};
