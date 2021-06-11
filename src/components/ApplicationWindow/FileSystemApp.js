import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Icon from "../Screen/Icons/Icon";
import NavAppWindow from "./NavAppWindow";
import AppButton from "./WindowComponents/AppButton";
import { cdOpenApp, openNewFolderApp } from "../../js/dispatch";
/* eslint-disable */
import documentsFolder from "url:../../images/folders/folder-documents.png";
import desktopFolder from "url:../../images/folders/folder-desktop.png";
import downloadsFolder from "url:../../images/folders/folder-downloads.png";
import musicFolder from "url:../../images/folders/folder-music.png";
import picturesFolder from "url:../../images/folders/folder-pictures.png";
import videosFolder from "url:../../images/folders/folder-videos.png";
import recentFolder from "url:../../images/folders/folder-recent.png";
/* eslint-enable */
const folders = {
  documentsFolder,
  desktopFolder,
  downloadsFolder,
  musicFolder,
  picturesFolder,
  videosFolder,
  recentFolder,
};

const FileSystemApp = ({ dispatch, state, id, toggle, setToggle, name }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [currentDir, setCurrentDir] = useState(
    state.apps.find((app) => app.id === id).dir
  );

  useEffect(() => {
    setCurrentDir(state.apps.find((app) => app.id === id).dir);
  });

  const checkDir = (string) =>
    string.toLowerCase() === currentDir ? true : false;

  const makeFileSystemNavButtons = () => {
    const buttons = [];
    for (const dir in state.dirs) {
      if (dir === "starred") {
        buttons.push(
          <AppButton
            key={"home"}
            active={checkDir}
            onClick={(v) => cdOpenApp(dispatch, id, v)}
          >
            Home
          </AppButton>
        );
      }
      buttons.push(
        <AppButton
          key={dir}
          active={checkDir}
          onClick={(v) => cdOpenApp(dispatch, id, v)}
        >
          {dir.slice(0, 1).toUpperCase() + dir.slice(1)}
        </AppButton>
      );
    }
    return buttons;
  };

  const createDirsInHomeFolder = () => {
    const dirsInHome = [];
    for (const dir in state.dirs) {
      const formattedDir = dir.slice(0, 1).toUpperCase() + dir.slice(1);
      dir === "starred" || dir === "trash"
        ? null
        : dirsInHome.push(
            <Icon
              key={dir}
              title={formattedDir}
              handleDoubleClick={() => cdOpenApp(dispatch, id, dir)}
              Icon={() => (
                <img
                  className="w-16"
                  src={folders[`${dir}Folder`]}
                  alt={`Icon for the ${formattedDir} folder`}
                />
              )}
            />
          );
    }
    return dirsInHome;
  };

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
        <span className="absolute text-white text-sm top-1 left-1 w-48 flex justify-between items-center">
          <span className="flex w-full">
            <button className="bg-gray-800 py-1.5 px-2 border border-black">{`[<]`}</button>
            <button className="bg-gray-800 py-1.5 px-2 border border-black">{`[>]`}</button>
          </span>
          <button
            className="py-1.5 w-64 relative bg-gray-800 border border-black"
            onClick={() => openNewFolderApp(dispatch, currentDir)}
          >
            {currentDir.slice(0, 1).toUpperCase() + currentDir.slice(1)}
            <span
              className="absolute right-2.5 transform rotate-45 -translate-y-0.5"
              style={{ fontSize: "9px" }}
            >
              ◢
            </span>
          </button>
        </span>
        <div className="content flex flex-col sm:flex-row w-full h-full">
          {/* Left Panel */}
          <section className="h-auto py-1 bg-gray-800 border-r border-gray-900 flex flex-row overflow-x-scroll sm:overflow-x-hidden sm:flex-col sm:w-60  ">
            {makeFileSystemNavButtons()}
            <hr className="w-full border-gray-900" />
            <AppButton active={checkDir}>Other Locations</AppButton>
          </section>
          <section className="grid grid-cols-2 sm:grid-cols-4 place-content-start gap-0 w-full h-full">
            {/* main view area */}
            <>
              {currentDir === "home"
                ? createDirsInHomeFolder()
                : state.dirs[currentDir].map(
                    ({ title, icon, handleDoubleClick, handleContextMenu }) => (
                      <Icon
                        title={title}
                        key={title}
                        Icon={icon}
                        handleDoubleClick={() => handleDoubleClick(dispatch)}
                        handleContextMenu={() =>
                          handleContextMenu(dispatch, title, () =>
                            handleDoubleClick(dispatch)
                          )
                        }
                        place="files"
                        // makeContextMenu={makeContextMenu}
                      />
                    )
                  )}
            </>
          </section>
        </div>
      </section>
    </Draggable>
  );
};
export default FileSystemApp;
