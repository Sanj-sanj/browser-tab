import { useRef } from "react";
import Button from "../Dropdown/Button";

const SettingsApp = ({ dispatch, toggle, backgrounds, background }) => {
  const bgsRef = useRef(createThumbails());
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
          className="w-36"
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
  return (
    <div className="flex w-full h-full">
      <section className="w-82 h-auto bg-gray-800 border-r border-gray-900">
        <Button> Other stuff</Button> <Button>Stuff</Button>
      </section>
      <section className="flex flex-col w-full h-full">
        {" "}
        {/* main view area */}
        {toggle ? (
          <>
            <div className="h-72 flex items-center justify-center">
              <img
                src={background}
                alt="thumbnail of current bg"
                className="w-52 sm:w-full sm:max-w-sm h-36 sm:h-56"
              />
            </div>
            <div className=" bg-gray-800 max-h-72 overflow-y-scroll ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 place-items-center">
                {bgsRef.current}
              </div>
            </div>
          </>
        ) : (
          <div className="h-72 w-96"></div>
        )}
      </section>
    </div>
  );
};
export default SettingsApp;
