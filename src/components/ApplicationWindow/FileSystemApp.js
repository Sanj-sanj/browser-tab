import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Icon from "../Screen/Icons/Icon";
import NavAppWindow from "./NavAppWindow";
import AppButton from "./WindowComponents/AppButton";
import { cdOpenApp } from "../../js/dispatch";

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
      dirsInHome.push(
        <Icon
          key={dir}
          title={dir.slice(0, 1).toUpperCase() + dir.slice(1)}
          handleDoubleClick={() => cdOpenApp(dispatch, id, dir)}
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
