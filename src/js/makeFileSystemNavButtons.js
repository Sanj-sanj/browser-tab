import AppButton from "../components/ApplicationWindow/WindowComponents/AppButton";
import { cdOpenApp } from "./dispatch";

const makeFileSystemNavButtons = (dispatch, id, dirs, checkDir) => {
  const buttons = [];
  for (const dir in dirs) {
    if (dir === "starred") {
      buttons.push(
        <AppButton
          key={"home"}
          active={checkDir}
          onClick={(v) => cdOpenApp(dispatch, id, v)}
        >
          Home
        </AppButton>
      );
    }
    buttons.push(
      <AppButton
        key={dir}
        active={checkDir}
        onClick={(v) => cdOpenApp(dispatch, id, v)}
      >
        {dir.slice(0, 1).toUpperCase() + dir.slice(1)}
      </AppButton>
    );
  }
  return buttons;
};
export default makeFileSystemNavButtons;
