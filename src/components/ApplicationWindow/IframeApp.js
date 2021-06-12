import { useState } from "react";
import Draggable from "react-draggable";
import NavAppWindow from "./NavAppWindow";

const IframeApp = ({
  name,
  src,
  wifi,
  toggle,
  clearDesktopContext,
  setToggle,
}) => {
  const [value, setValue] = useState(src);
  const [fullscreen, setFullscreen] = useState(false);

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
        className={`bg-gray-700 border flex flex-col min-w-min border-gray-900 shadow-2xl transition-h-w z-20 rounded-t-md `}
        style={{
          width: fullscreen
            ? "100%"
            : name === "Javascript-Racer"
            ? "600px"
            : "75%",
          height: fullscreen
            ? "100%"
            : name === "Javascript-Racer"
            ? "545px"
            : "60%",
        }}
        role="presentation"
        onContextMenu={(e) => e.preventDefault()}
      >
        <NavAppWindow
          setToggle={setToggle}
          toggleFullscreen={() => setFullscreen(!fullscreen)}
          name={name}
        />
        {name.includes("Browser") ? (
          <div className="searchBar pt-1 pb-1.5 relative w-full bg-gray-700 flex justify-center items-center">
            <div className="absolute flex left-0 pl-2">
              <button onClick={() => setValue(value)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="white"
                  className="bi bi-arrow-clockwise transform rotate-45"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
              </button>
            </div>
            <input
              type="text"
              className="w-3/5 pl-4 py-1 text-white text-sm bg-gray-800 rounded"
              defaultValue={"https://www.google.ca"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  let url = e.target.value;
                  url.toLowerCase().includes("google") ? (url = src) : url;
                  url.includes("https://") ? url : (url = "https://" + url);
                  e.target.value = url;
                  return setValue(url);
                }
              }}
              spellCheck={false}
            />
          </div>
        ) : null}
        {wifi ? (
          <iframe
            src={value ? value : src}
            title={name}
            width={name === "Javascript-Racer" ? "645px" : "100%"}
            height={name === "Javascript-Racer" ? "525px" : "100%"}
            onLoad={(e) => {
              clearDesktopContext();
              e.target.focus();
            }}
          />
        ) : (
          <div className="flex flex-col justify-center items-center text-center max-w-xl h-96 p-4">
            {" "}
            <p>Wifi is not connected!</p>
            Please turn on the Wifi to connect to the internet.{" "}
          </div>
        )}
      </section>
    </Draggable>
  );
};
export default IframeApp;
