import Icon from "../Icons/Icon";
import SearchBar from "../../SearchBar/SearchBar";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const Activities = () => {
  const {
    dispatch,
    state: { activeView, apps, dirs },
  } = useContext(UserContext);

  return (
    <div
      className="w-full h-full flex flex-col z-10 bg-black bg-opacity-70 animate-fade-in"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* top panel */}
      <div className="w-full py-6">
        <SearchBar />
      </div>
      <div
        className={`flex  flex-row justify-between h-full items-center mb-8`}
      >
        <section
          className={`flex flex-col justify-around items-center p-2 animate-slide-in-left border-l-0 border border-gray-500 rounded-r-xl rounded-br-xl w-auto bg-gray-600 bg-opacity-60 ${
            activeView ? "animate-slide-out-left" : ""
          }`}
        >
          {dirs.starred.map(({ title, icon, handleDoubleClick }) => (
            <Icon
              title={title}
              key={title}
              handleDoubleClick={() => {
                dispatch({
                  type: "updateActiveView",
                  payload: true,
                });
                handleDoubleClick(dispatch);
              }}
              Icon={icon}
              place="activities"
            />
          ))}
        </section>
        {/* middle portion two columns absolutely pos, spaced apart */}
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
