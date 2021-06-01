import Icon from "../Icons/Icon";
import SearchBar from "../../SearchBar/SearchBar";
import { useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const Activities = () => {
  const {
    state: { activeView },
  } = useContext(UserContext);

  // console.log(state, "ac");
  return (
    <div
      className="w-full h-full flex flex-col z-10"
      onClickCapture={(e) => {
        // console.log(e);
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <>
        {/* screen with opened stuff*/}
        {/* app panel */}
        {/* desktops panel */}
        {/*opened apps in window view*/}
      </>
      <div className="w-full py-6">
        {/* top panel */}
        <SearchBar />
      </div>
      <div
        className={`flex  flex-row justify-between h-full items-center mb-8`}
      >
        {/* middle portion two columns absolutely pos, spaced apart */}
        <section
          className={`flex flex-col justify-around items-center p-2 animate-slide-in-left border-l-0 border border-gray-500 rounded-r-xl rounded-br-xl w-1/6 lg:w-1/12 bg-gray-600 bg-opacity-60 ${
            activeView ? "animate-slide-out-left" : ""
          }`}
        >
          <span className="w-full h-20 max-h-20">
            <Icon title="dog" />
          </span>
          <span className="w-full h-20 max-h-20">
            <Icon title="dog" />
          </span>
          <span className="w-full h-20 max-h-20">
            <Icon title="dog" />
          </span>
          <span className="w-full h-20 max-h-20">
            <Icon title="dog" />
          </span>
          <span className="w-full h-20 max-h-20">
            <Icon title="dog" />
          </span>
        </section>
        <section
          className={`flex flex-col justify-around items-center p-2 animate-slide-in-right border-r-0 border border-gray-500 rounded-l-xl rounded-bl-xl h-full w-1/6 lg:w-36 bg-gray-600 bg-opacity-60 ${
            activeView ? "animate-slide-out-right" : ""
          }`}
        >
          {" "}
          [stuff]
        </section>
      </div>
    </div>
  );
};
export default Activities;
