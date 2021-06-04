import Icon from "../Icons/Icon";
import SearchBar from "../../SearchBar/SearchBar";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const Activities = () => {
  const {
    state: { activeView, apps },
  } = useContext(UserContext);

  // console.log(state, "ac");
  return (
    <div
      className="w-full h-full flex flex-col z-10"
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
          className={`flex flex-col justify-around items-center p-2 animate-slide-in-left border-l-0 border border-gray-500 rounded-r-xl rounded-br-xl w-auto bg-gray-600 bg-opacity-60 ${
            activeView ? "animate-slide-out-left" : ""
          }`}
        >
          <Icon title="dog" place="activities" />
          <Icon title="dog" place="activities" />
          <Icon title="dog" place="activities" />
          <Icon title="dog" place="activities" />
          <Icon title="dog" place="activities" />
        </section>
        <section
          className={`flex flex-col justify-around items-center p-2 animate-slide-in-right border-r-0 border border-gray-500 rounded-l-xl rounded-bl-xl h-full w-36 bg-gray-600 bg-opacity-60 ${
            activeView ? "animate-slide-out-right" : ""
          }`}
        >
          {console.log(apps)}
        </section>
      </div>
    </div>
  );
};
export default Activities;
