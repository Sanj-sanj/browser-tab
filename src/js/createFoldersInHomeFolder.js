import Icon from "../components/Screen/Icons/Icon";
import { cdOpenApp } from "./dispatch";
/* eslint-disable */
import documentsFolder from "url:../images/folders/folder-documents.png";
import desktopFolder from "url:../images/folders/folder-desktop.png";
import downloadsFolder from "url:../images/folders/folder-downloads.png";
import musicFolder from "url:../images/folders/folder-music.png";
import picturesFolder from "url:../images/folders/folder-pictures.png";
import videosFolder from "url:../images/folders/folder-videos.png";
import recentFolder from "url:../images/folders/folder-recent.png";
/* eslint-enable */
const folders = {
  documentsFolder,
  desktopFolder,
  downloadsFolder,
  musicFolder,
  picturesFolder,
  videosFolder,
  recentFolder,
};

const createFoldersInHomeFolder = (dispatch, id, dirs) => {
  const dirsInHome = [];
  for (const dir in dirs) {
    const formattedDir = dir.slice(0, 1).toUpperCase() + dir.slice(1);
    dir === "starred" || dir === "trash"
      ? null
      : dirsInHome.push(
          <Icon
            key={dir}
            title={formattedDir}
            handleDoubleClick={() => cdOpenApp(dispatch, id, dir)}
            Icon={() => (
              <img
                className="w-16"
                src={folders[`${dir}Folder`]}
                alt={`Icon for the ${formattedDir} folder`}
              />
            )}
          />
        );
  }
  return dirsInHome;
};
export default createFoldersInHomeFolder;
