import Icon from "../Screen/Icons/Icon";
import AppButton from "./WindowComponents/AppButton";

const FileSystemApp = ({ dispatch, state, id }) => {
  return (
    <div className="flex w-full h-full">
      <section className="w-60 h-auto py-1 bg-gray-800 border-r border-gray-900">
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
      <section className="grid grid-cols-5 gap-0 w-full h-full">
        {" "}
        {/* main view area */}
        <>
          {/* <div className="h-72 w-96"> */}
          {state.dirs[state.apps.find((app) => app.id === id).dir].map(
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
  );
};
export default FileSystemApp;
