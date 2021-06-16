import AppButton from "../components/ApplicationWindow/WindowComponents/AppButton";
import { cdOpenApp } from "./dispatch";
import Desktop from "../components/svg/fileSystem/Desktop";
import Documents from "../components/svg/fileSystem/Documents";
import Downloads from "../components/svg/fileSystem/Downloads";
import Home from "../components/svg/fileSystem/Home";
import Music from "../components/svg/fileSystem/Music";
import Pictures from "../components/svg/fileSystem/Pictures";
import Recent from "../components/svg/fileSystem/Recent";
import Starred from "../components/svg/fileSystem/Starred";
import Trash from "../components/svg/fileSystem/Trash";
import Videos from "../components/svg/fileSystem/Videos";
const iconsArr = [
  Desktop,
  Documents,
  Downloads,
  Music,
  Pictures,
  Recent,
  Starred,
  Trash,
  Videos,
];
const makeFileSystemNavButtons = (dispatch, id, dirs, checkDir) => {
  const buttons = [];
  for (const dir in dirs) {
    if (dir === "starred") {
      buttons.push(
        <AppButton
          key={"home"}
          isActive={checkDir}
          onClick={(v) => cdOpenApp(dispatch, id, v)}
          Icon={Home}
        >
          Home
        </AppButton>
      );
    }
    console.log(dir.slice(0, 1).toUpperCase() + dir.slice(1));
    console.log(iconsArr);
    buttons.push(
      <AppButton
        key={dir}
        isActive={checkDir}
        onClick={(v) => cdOpenApp(dispatch, id, v)}
        Icon={iconsArr.filter((func) => func.name.toLowerCase() === dir)[0]}
      >
        {dir.slice(0, 1).toUpperCase() + dir.slice(1)}
      </AppButton>
    );
  }
  return buttons;
};
export default makeFileSystemNavButtons;
