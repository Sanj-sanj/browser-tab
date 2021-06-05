import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import Button from "../Dropdown/Button";
import "./ApplicationWindow.modules.css";
/* eslint-disable */
import Dragisa from "url:../../images/dragisa-sm.jpeg?as=webp";
import Honeycomb from "url:../../images/Honeycomb-sm.jpeg?as=webp";
import Mountain from "url:../../images/mountains-sm.jpeg?as=webp";
import Robot from "url:../../images/robot-sm.jpeg?as=webp";
/* eslint-enable */

const appRoot = document.getElementById("window");
const backgrounds = { Dragisa, Honeycomb, Mountain, Robot };

const useValue = () => {
  const [value, setValue] = useState("");
  const onChange = (val) => setValue(val);
  return [value, onChange];
};

const ApplicationWindow = ({ file, name, dispatch, id, state }) => {
  //ID gets supplied on creation, use id to alter state.active by filtering.
  const elRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [value, onChange] = useValue();

  function createThumbails() {
    const gallery = [];
    for (const name in backgrounds) {
      let thumbnail = (
        <button
          key={name}
          onClick={() =>
            dispatch({
              type: "changeBackground",
              payload: name,
            })
          }
          className="w-auto"
        >
          <img
            src={[backgrounds[name]]}
            alt={`Thumbnail of the ${name} wallpaper`}
          />
        </button>
      );
      gallery.push(thumbnail);
    }
    return gallery;
  }

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.className =
      "w-full h-full absolute top-7 pb-16 flex justify-center items-center";
  }
  useEffect(() => {
    appRoot.appendChild(elRef.current);
    if (!toggle) {
      dispatch({
        type: "closeApp",
        payload: {
          id: id,
        },
      });
      appRoot.removeChild(elRef.current);
    }
    return () =>
      appRoot.children.length ? appRoot.removeChild(elRef.current) : null;
  }, [toggle]);

  return createPortal(
    <Draggable bounds={"parent"} cancel=".exit">
      <section
        className={`bg-gray-700 border border-gray-900 shadow-2xl z-20 rounded-t-md`}
        role="presentation"
      >
        <nav
          className={`relative w-full ${
            name === "New Folder" ? "py-2.5" : "py-1"
          } bg-gray-900 text-center text-sm font-bold text-white`}
        >
          {name}
          <button
            className="exit group absolute right-0 focus:outline-none"
            onClick={() => setToggle(false)}
          >
            <span className="absolute right-3 w-3 h-3 transform translate-y-1 bg-white rounded-2xl "></span>
            <span className="absolute right-2 text-yellow-600 fill-current hover:text-gray-600 active:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </span>
          </button>
        </nav>
        {name === "Javascript-Racer" ? (
          <iframe
            sandbox="allow-scripts"
            src={file}
            title={name}
            width="644"
            height="525"
            onLoad={(e) => {
              e.target.focus();
            }}
          />
        ) : name === "Settings" ? (
          <div className="flex w-full h-full">
            <section className="w-82 h-auto bg-gray-800 border-r border-gray-900">
              <Button> Other stuff</Button> <Button>Stuff</Button>
            </section>
            <section className="flex flex-col w-full h-full">
              {" "}
              {/* main view area */}
              <div className="h-72 flex items-center justify-center">
                <img
                  src={backgrounds[state.background]}
                  alt="thumbnail of current bg"
                />
              </div>
              <div className=" bg-gray-800 max-h-72 overflow-y-scroll ">
                <div className="grid grid-cols-2 gap-3 p-4 place-items-center">
                  {createThumbails()}
                </div>
              </div>
            </section>
          </div>
        ) : name === "New Folder" ? (
          <>
            <button
              className={`absolute border border-gray-800 top-0.5 left-1 rounded py-1 px-3  ${
                value
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-gray-700 text-gray-500"
              } `}
              onClick={() => {
                dispatch({
                  type: "mkdir",
                  payload: {
                    title: value,
                    handleContextMenu: state.desktopContext.onClick,
                  },
                }),
                  setToggle(false);
              }}
              disabled={value ? false : true}
            >
              Create
            </button>
            <div className="w-72 py-4 px-0.5 flex justify-center items-center bg-gray-800">
              <input
                className="w-full text-white px-2 rounded focus:outline-none bg-gray-700 border-2 border-transparent focus:border-yellow-500"
                type="text"
                //eslint-disable-next-line
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && e.target.value
                    ? (dispatch({
                        type: "mkdir",
                        payload: {
                          title: e.target.value,
                          handleContextMenu: state.desktopContext.onClick,
                        },
                      }),
                      setToggle(false))
                    : null
                }
              />
            </div>
          </>
        ) : null}
      </section>
    </Draggable>,
    elRef.current
  );
};
export default ApplicationWindow;
