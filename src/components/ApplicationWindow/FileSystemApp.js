import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import goNext from "url:../../images/folders/go-next.png"; //eslint-disable-line
import goPrev from "url:../../images/folders/go-previous.png"; //eslint-disable-line
import Other from "../svg/fileSystem/Other";
import Icon from "../Screen/Icons/Icon";
import NavAppWindow from "./NavAppWindow";
import AppButton from "./WindowComponents/AppButton";
import {
  cdOpenApp,
  clearDesktopContext,
  openNewFolderApp,
} from "../../js/dispatch";
import createFoldersInHomeFolder from "../../js/createFoldersInHomeFolder";
import makeFileSystemNavButtons from "../../js/makeFileSystemNavButtons";
import useMenu from "../../hooks/useMenu";
import useMobileEventHandlers from "../../hooks/useMobileEventHandlers";
import ContextMenu from "../ContextMenu/ContextMenu";

const FileSystemApp = ({
  dispatch,
  state,
  id: fsId,
  toggle,
  setToggle,
  setFocus,
  clearDesktopMenu,
}) => {
  const currentOpenApp = state.apps.find((app) => app.id === fsId);
  console.log(currentOpenApp);
  //rename need fix crashes when fs open on rename of same folder
  // const items = currentOpenApp.length;
  const foldersRef = useRef(
    createFoldersInHomeFolder(dispatch, fsId, state.dirs)
  );
  const [fullscreen, setFullscreen] = useState(false);
  const [currentDir, setCurrentDir] = useState(currentOpenApp.dir);
  const [contextMenu, setContextMenu] = useState({ x: 0, y: 0 });
  // const [dirHistory, setDirHistory] = useState([]); //noPurpose yet
  const [onTouchStart] = useMobileEventHandlers(goToHomeDirectory);
  const [start, [dirsArray]] = getNestedDirs();
  const [menu, makeMenu] = useMenu(clearMenu);

  console.log(start, dirsArray);
  useEffect(() => {
    setCurrentDir(currentOpenApp.dir);
  });

  const makeContextMenu = (e) => {
    const screenRects = document
      .querySelector("section.desktopScreen")
      .getBoundingClientRect();
    setContextMenu({ x: e.pageX, y: e.pageY, screenRects });
  };

  function getNestedDirs() {
    if (currentDir.includes("/")) {
      const dirsArray = currentDir.split("/");
      const howDeep = dirsArray.length;
      let start = state.dirs[dirsArray[0]];
      for (let i = 1; i < howDeep; i++) {
        try {
          start = start.find((item) => item[dirsArray[i]])[dirsArray[i]];
        } catch (err) {
          //resets the state.app.dir val when folder is open and renamed while open in the same dir
          cdOpenApp(dispatch, fsId, dirsArray[0]);
        }
      }
      return [start, [dirsArray]];
    }
    return [state.dirs[currentDir], [currentDir]];
  }

  const formatDirName = (name) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  };

  function goToHomeDirectory() {
    cdOpenApp(dispatch, fsId, "home");
  }

  const checkDir = (string) =>
    string.toLowerCase() === currentDir ? true : false;

  function clearMenu() {
    makeMenu(null);
  }
  const clearMenuAndMenuContext = () => {
    setContextMenu({ x: 0, y: 0 });
    clearDesktopContext(dispatch);
  };

  return (
    <>
      <Draggable
        bounds={"parent"}
        cancel=".exit, button"
        defaultClassName={`${
          toggle ? "animate-pop-out-inside " : "animate-fade-out"
        }`}
        position={fullscreen ? { x: 0, y: 0 } : null}
      >
        <section
          className={`fsApp bg-pop-900 border h-96 sm:h-auto border-pop-900 flex flex-col w-3/4 sm:w-176 shadow-2xl overflow-hidden transition-h-w z-20 rounded-t-md`}
          style={{
            width: fullscreen ? "100%" : " ",
            height: fullscreen ? "100%" : " ",
            minWidth: fullscreen ? "" : "20rem",
            minHeight: fullscreen ? "" : "15rem",
            zIndex: state.isFocused.id === fsId ? "30" : "20",
          }}
          role="presentation"
          onContextMenu={(e) => {
            e.stopPropagation();
            e.preventDefault();
            clearMenu();
            clearDesktopMenu();
          }}
          onClick={(e) => {
            e.stopPropagation();
            menu ? clearMenu() : null;
            !contextMenu.y ? clearDesktopMenu() : null;
            setFocus();
            clearMenuAndMenuContext();
          }}
        >
          <NavAppWindow
            setToggle={setToggle}
            toggleFullscreen={() => setFullscreen(!fullscreen)}
            thickBar={true}
            name={""}
          />
          <div className="absolute text-white text-sm top-1 left-1 flex justify-between items-center">
            <span className="border bg-pop-800 border-pop-900 rounded mr-1 h-8 hidden sm:flex">
              <button
                className="border-r bg-pop-850 border-pop-900 pr-1 pl-2 py-1.5"
                // onClick={() => console.log(dirHistory)}
              >
                <img className="w-5" src={goPrev} alt="button" />
              </button>
              <button
                className="border-l bg-pop-850 border-pop-900 pl-1 pr-2 py-1.5"
                // onClick={() => console.log(dirHistory)}
              >
                <img className="w-5" src={goNext} alt="button" />
              </button>
            </span>
            <span className="dirButtons bg-pop-800 rounded border border-pop-900 ">
              <button
                className="py-1.5 w-24 relative flex-initial"
                onClick={() => goToHomeDirectory()}
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
                        className="py-1.5 px-4 relative border-l border-pop-900 overflow-hidden max-h-8 whitespace-nowrap overflow-ellipsis flex-initial"
                        style={{ maxWidth: "7.75rem" }}
                        onClick={() => {
                          const ind = dirsArray.indexOf(dir);
                          cdOpenApp(
                            dispatch,
                            fsId,
                            [...dirsArray].slice(0, ind + 1).join("/")
                          );
                        }}
                      >
                        {formatDirName(dir)}
                      </button>
                    );
                  })}
              {currentDir !== "home" ? (
                <button
                  className="py-1.5 px-4 relative border-l border-pop-900 overflow-hidden max-h-8 whitespace-nowrap overflow-ellipsis flex-initial"
                  style={{ maxWidth: "7.75rem" }}
                  onClick={(e) => {
                    !Array.isArray(dirsArray) ||
                    (Array.isArray(dirsArray) && dirsArray.length < 3) // can go up to 5? breaks othe shit thoouh
                      ? makeMenu(e.target, "file system", () =>
                          openNewFolderApp(dispatch, currentDir)
                        )
                      : null;
                  }}
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

            <section
              className="h-auto py-1 bg-pop-850 border-r border-pop-900 flex flex-row overflow-x-scroll sm:overflow-x-hidden sm:flex-col sm:w-60"
              style={{ minHeight: "4.5rem" }}
            >
              {makeFileSystemNavButtons(dispatch, fsId, state.dirs, checkDir)}
              <hr className="w-full border-pop-900" />
              <AppButton isActive={checkDir} Icon={Other}>
                Other Locations
              </AppButton>
            </section>
            <section className="flex flex-wrap w-full h-2/3 sm:h-min overflow-y-scroll sm:overflow-auto ">
              {/* main view area */}
              <>
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
                          if (title === "Files" && id === "001") return;
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
                                    `${currentDir}/${title}`
                                  )
                                : handleDoubleClick(dispatch);
                            }}
                            handleContextMenu={(e) =>
                              handleContextMenu(
                                dispatch,
                                title,
                                id,
                                currentDir,
                                e,
                                () => handleDoubleClick(dispatch)
                              )
                            }
                            place="files"
                            makeContextMenu={makeContextMenu}
                          />
                        );
                      }
                    )}
              </>
            </section>
          </div>
        </section>
      </Draggable>
      {menu ? menu : null}
      {contextMenu.y ? (
        <ContextMenu
          position={contextMenu}
          close={() => clearMenuAndMenuContext()}
          context={{ state, dispatch }}
          whatDir={currentDir}
        />
      ) : null}
    </>
  );
};
export default FileSystemApp;
