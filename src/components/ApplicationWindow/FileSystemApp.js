import { useState } from "react";
import Draggable from "react-draggable";
import Icon from "../Screen/Icons/Icon";
import NavAppWindow from "./NavAppWindow";
import AppButton from "./WindowComponents/AppButton";

const FileSystemApp = ({ dispatch, state, id, toggle, setToggle, name }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const currentDir = state.apps.find((app) => app.id === id).dir;

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
        className={`bg-gray-700 border flex flex-col sm:w-176 border-gray-900 shadow-2xl transition-h-w z-20 rounded-t-md `}
        style={{
          width: fullscreen ? "100%" : "  ",
          height: fullscreen ? "100%" : "30rem",
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
        <div className="flex w-full h-full">
          <section className="w-60 h-auto py-1 bg-gray-800 border-r border-gray-900">
            <AppButton active={checkDir}>Recent</AppButton>
            <AppButton active={checkDir}>Starred</AppButton>
            <AppButton active={checkDir}>Home</AppButton>
            <AppButton active={checkDir}>Desktop</AppButton>
            <AppButton active={checkDir}>Documents</AppButton>
            <AppButton active={checkDir}>Downloads</AppButton>
            <AppButton active={checkDir}>Music</AppButton>
            <AppButton active={checkDir}>Pictures</AppButton>
            <AppButton active={checkDir}>Videos</AppButton>
            <AppButton active={checkDir}>Trash</AppButton>
            <hr className="w-full border-gray-900" />

            <AppButton active={checkDir}>Other Locations</AppButton>
          </section>
          <section className="grid grid-cols-3 sm:grid-cols-5 gap-0 w-full h-full">
            {" "}
            {/* main view area */}
            <>
              {state.dirs[currentDir].map(
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
              <div className="w-full flex flex-row "></div>
              {/* </div> */}
            </>
          </section>
        </div>
      </section>
    </Draggable>
  );
};
export default FileSystemApp;
