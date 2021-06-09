import { useState } from "react";

const IframeApp = ({ name, src, wifi }) => {
  const [value, setValue] = useState(src);

  return (
    <>
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
          width="644"
          height="525"
          onLoad={(e) => {
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
    </>
  );
};
export default IframeApp;
