import { useRef } from "react";
import AppButton from "./WindowComponents/AppButton";
import createThumbnails from "../../js/createThumbnails";

const SettingsApp = ({ dispatch, backgrounds, background }) => {
  const bgsRef = useRef(createThumbnails(dispatch, backgrounds));

  return (
    <div className="flex w-full h-full">
      <section className="w-82 h-auto py-1 bg-gray-800 border-r border-gray-900">
        <AppButton onClick={() => console.log("wip")}>Recent</AppButton>
        <AppButton onClick={() => console.log("wip")}>Starred</AppButton>
        <AppButton onClick={() => console.log("wip")}>Home</AppButton>
        <AppButton onClick={() => console.log("wip")}>Desktop</AppButton>
        <AppButton onClick={() => console.log("wip")}>Documents</AppButton>
        <AppButton onClick={() => console.log("wip")}>Downloads</AppButton>
        <AppButton onClick={() => console.log("wip")}>Music</AppButton>
        <AppButton onClick={() => console.log("wip")}>Pictures</AppButton>
        <AppButton onClick={() => console.log("wip")}>Videos</AppButton>
        <AppButton onClick={() => console.log("wip")}>Trash</AppButton>
        <hr className="w-full border-gray-900" />

        <AppButton>Other Locations</AppButton>
      </section>
      <section className="flex flex-col w-full h-full">
        {" "}
        {/* main view area */}
        <>
          <div className="h-72 flex flex-col items-center justify-center">
            <div className="w-52 sm:w-full sm:max-w-sm">
              <span className="w-auto block bg-gray-900 h-2 text-xs"></span>
              <img
                src={background}
                alt="thumbnail of current bg"
                className="w-52 sm:w-full sm:max-w-sm h-36 sm:h-56"
              />
            </div>
          </div>
          <div className=" bg-gray-800 max-h-72 overflow-y-scroll ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 place-items-center">
              {bgsRef.current}
            </div>
          </div>
        </>
      </section>
    </div>
  );
};
export default SettingsApp;
