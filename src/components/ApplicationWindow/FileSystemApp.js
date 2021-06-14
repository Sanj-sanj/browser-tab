import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Icon from "../Screen/Icons/Icon";
import NavAppWindow from "./NavAppWindow";
import AppButton from "./WindowComponents/AppButton";
import { cdOpenApp, openNewFolderApp } from "../../js/dispatch";
import createFoldersInHomeFolder from "../../js/createFoldersInHomeFolder";
import makeFileSystemNavButtons from "../../js/makeFileSystemNavButtons";

const FileSystemApp = ({
  dispatch,
  state,
  id: fsId,
  toggle,
  setToggle,
  name,
}) => {
  const foldersRef = useRef(
    createFoldersInHomeFolder(dispatch, fsId, state.dirs)
  );
  const [fullscreen, setFullscreen] = useState(false);
  const [currentDir, setCurrentDir] = useState(
    state.apps.find((app) => app.id === fsId).dir
  );
  const [start, [dirsArray]] = getNestedDirs();
  // console.log("what", start);
  function getNestedDirs() {
    if (currentDir.includes("/")) {
      const dirsArray = currentDir.split("/");
      const howDeep = dirsArray.length;
      let start = state.dirs[dirsArray[0]];
      // let thisDir;
      for (let i = 1; i < howDeep; i++) {
        // thisDir = dirsArray[i];
        // console.log(howDeep);
        // console.log(dirsArray);
        start = start.filter((item) => item[dirsArray[i]]);
        // console.log("loops", start[0][dirsArray[i]]);
        // console.log(thisDir);
        //second loop is looking for [foldername : []], what is there is [3: foldername:[]]
      }
      // return [start[0][thisDir], [dirsArray]];
      return [start, [dirsArray]];
    }
    return [state.dirs[currentDir], [currentDir]];
  }

  useEffect(() => {
    setCurrentDir(state.apps.find((app) => app.id === fsId).dir);
  });

  const formatDirName = (name) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  };

  const checkDir = (string) =>
    string.toLowerCase() === currentDir ? true : false;

  return (
    <Draggable
      bounds={"parent"}
      cancel=".exit"
      defaultClassName={`${
        toggle ? "animate-pop-out-inside " : "animate-fade-out"
      }`}
      position={fullscreen ? { x: 0, y: 0 } : null}
    >
      <section
        className={`bg-gray-700 border flex flex-col w-3/4 sm:w-176 border-gray-900 shadow-2xl overflow-hidden transition-h-w z-20 rounded-t-md `}
        style={{
          width: fullscreen ? "100%" : "  ",
          height: fullscreen ? "100%" : "73%",
        }}
        role="presentation"
        onContextMenu={(e) => e.preventDefault()}
      >
        <NavAppWindow
          setToggle={setToggle}
          toggleFullscreen={() => setFullscreen(!fullscreen)}
          thickBar={true}
          name={name}
        />
        <div className="absolute text-white text-sm top-1 left-1 flex justify-between items-center">
          <span className="flex border bg-gray-800 border-black rounded mr-1">
            <button className="border-r border-black py-1.5 px-2 ">{`[<]`}</button>
            <button className="border-l border-black py-1.5 px-2 ">{`[>]`}</button>
          </span>
          <span className="bg-gray-800 rounded border border-black">
            <button
              className="py-1.5 w-24 relative "
              onClick={() => cdOpenApp(dispatch, fsId, "home")}
            >
              Home
            </button>
            {!Array.isArray(dirsArray)
              ? null
              : dirsArray.map((dir, i) => {
                  if (i === dirsArray.length - 1) return;
                  return (
                    <button
                      key={dir}
                      className={`py-1.5 px-4 relative border-l border-gray-900`}
                      onClick={() => cdOpenApp(dispatch, fsId, dir)}
                    >
                      {formatDirName(dir)}
                    </button>
                  );
                })}
            {currentDir !== "home" ? (
              <button
                className="py-1.5 px-4 relative border-l border-black"
                onClick={() =>
                  currentDir === "home" ||
                  (Array.isArray(dirsArray) &&
                    currentDir === dirsArray.join("/"))
                    ? null
                    : openNewFolderApp(dispatch, currentDir)
                }
              >
                {Array.isArray(dirsArray)
                  ? formatDirName(dirsArray[dirsArray.length - 1])
                  : formatDirName(currentDir)}
                <span className="pl-4">
                  <span
                    className="absolute right-2.5 transform rotate-45 -translate-y-0.5"
                    style={{ fontSize: "9px" }}
                  >
                    ◢
                  </span>
                </span>
              </button>
            ) : null}
          </span>
        </div>
        <div className="content flex flex-col sm:flex-row w-full h-full">
          {/* Left Panel */}

          <section className="h-auto py-1 bg-gray-800 border-r border-gray-900 flex flex-row overflow-x-scroll sm:overflow-x-hidden sm:flex-col sm:w-60  ">
            {makeFileSystemNavButtons(dispatch, fsId, state.dirs, checkDir)}
            <hr className="w-full border-gray-900" />
            <AppButton active={checkDir}>Other Locations</AppButton>
          </section>
          <section className="grid grid-cols-2 sm:grid-cols-4 place-content-start gap-0 w-full h-full">
            {/* main view area */}
            <>
              {/* {console.log(state.dirs[currentDir])} */}
              {currentDir === "home"
                ? foldersRef.current
                : start.map(
                    ({
                      title,
                      type,
                      id,
                      icon,
                      handleDoubleClick,
                      handleContextMenu,
                    }) => {
                      if (title)
                        return (
                          <Icon
                            title={title}
                            key={id}
                            Icon={icon}
                            handleDoubleClick={() => {
                              type === "folder"
                                ? cdOpenApp(
                                    dispatch,
                                    fsId,
                                    Array.isArray(dirsArray)
                                      ? dirsArray
                                      : `${currentDir}/${title}`
                                  )
                                : handleDoubleClick(dispatch);
                            }}
                            handleContextMenu={() =>
                              handleContextMenu(dispatch, title, () =>
                                handleDoubleClick(dispatch)
                              )
                            }
                            place="files"
                            // makeContextMenu={makeContextMenu}
                          />
                        );
                    }
                  )}
            </>
          </section>
        </div>
      </section>
    </Draggable>
  );
};
export default FileSystemApp;
