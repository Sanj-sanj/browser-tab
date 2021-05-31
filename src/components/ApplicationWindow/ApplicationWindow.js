import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

const appRoot = document.getElementById("window");

const ApplicationWindow = ({ file, name, dispatch, id }) => {
  const elRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
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
    <section className="absolute top-7 left-1 bg-gray-700 border border-gray-900 shadow-2xl z-40 rounded-t-md">
      <nav className="relative w-full py-1 bg-gray-900 text-center text-sm font-bold text-white">
        {name}
        <button
          className="group absolute right-0 focus:outline-none"
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
      <div className="p-2">
        <iframe
          sandbox="allow-scripts"
          src={file}
          title={name}
          width="644"
          height="525"
          onLoad={(e) => {
            e.target.focus();
          }}
        ></iframe>{" "}
      </div>
    </section>,
    elRef.current
  );
};
export default ApplicationWindow;
