import { useEffect } from "react";
import Button from "../Dropdown/Button";
import {
  openSettings,
  openNewFolderApp,
  openFiles,
  renameItem,
  moveItem,
} from "../../js/dispatch";
import useMenu from "../../hooks/useMenu";

const ContextMenu = ({
  position,
  close,
  context: {
    state: { desktopContext },
    dispatch,
  },
  whatDir = "desktop",
  position: { screenRects },
}) => {
  const [menu, makeMenu] = useMenu(clearAndUnfocusMenu);

  if (position.x + 192 >= screenRects.width) {
    position.x = position.x - 192;
  }
  if (position.y + 231 >= screenRects.bottom) {
    position.y = position.y - 231;
  }
  const closeMenu = (e) => {
    e.key === "Escape" || e.type === "click" ? close() : null;
  };

  function clearAndUnfocusMenu() {
    makeMenu(null);
    close();
  }
  useEffect(() => {
    const body = document.body;
    const nav = document.querySelector("nav.relative.w-full.h-7.max-h-7");
    body.addEventListener("keydown", closeMenu);
    nav.addEventListener("click", closeMenu);

    return () => {
      body.removeEventListener("keydown", closeMenu);
      nav.removeEventListener("click", closeMenu);
    };
  });
  const getIconRects = () => {
    let rects;
    const nodeName = desktopContext.e.target.nodeName;
    const target = desktopContext.e.target;
    if (!desktopContext.e) return;
    nodeName === "BUTTON"
      ? (rects = target.getClientRects()[0])
      : nodeName === "path"
      ? (rects =
          target.parentElement.parentElement.parentElement.getClientRects()[0])
      : nodeName === "svg"
      ? (rects = target.parentElement.offsetParent.getClientRects()[0])
      : (rects = target.offsetParent.getClientRects()[0]);
    return { top: rects.bottom, left: rects.left };
  };

  return (
    <>
      {!menu ? (
        <div
          className="absolute w-48 py-1 rounded z-50 text-gray-100 bg-pop-900 border border-pop-800 "
          style={{ top: position.y - screenRects.y, left: position.x }}
          role="presentation"
          onKeyDown={closeMenu}
        >
          {/* The component 'Desktop's onContextMenu handler prevents default, maps icons with custom handelUseContext to save icon name and onDoubleClick to Context, context Menu watches this on render to complete application context.*/}
          {desktopContext.title ? (
            <>
              <>
                <Button close={close} _onClick={desktopContext.onClick}>
                  Open
                </Button>
                <Button close={close}>Cut</Button>
                <Button close={close}>Copy</Button>
                <Button
                  close={() => {}}
                  _onClick={() =>
                    desktopContext.e
                      ? makeMenu(getIconRects(), "rename", (value) =>
                          renameItem(
                            dispatch,
                            value,
                            desktopContext.id,
                            whatDir
                          )
                        )
                      : null
                  }
                >
                  Rename...
                </Button>
                <Button
                  close={close}
                  _onClick={() => {
                    moveItem(dispatch, desktopContext.id, whatDir, "trash");
                  }}
                >
                  Move to Trash
                </Button>
                <hr className="w-full border-pop-900" />
                <Button close={close}>Properties</Button>
                <hr className="w-full border-pop-900" />
                <Button
                  close={close}
                  _onClick={() => openFiles(dispatch, whatDir)}
                >
                  Show in Files
                </Button>
              </>
            </>
          ) : (
            <>
              <Button
                close={close}
                _onClick={() => openNewFolderApp(dispatch, whatDir)}
              >
                New Folder
              </Button>
              <hr className="w-full border-pop-900" />
              <Button close={close}>Paste</Button>
              <hr className="w-full border-pop-900" />
              <Button close={close}>Select All</Button>
              <hr className="w-full border-pop-900" />
              <Button
                close={close}
                _onClick={() => openFiles(dispatch, "desktop")}
              >
                Show Desktop in Files
              </Button>
              <Button close={close}>Open in Terminal</Button>
              <hr className="w-full border-pop-900" />
              <Button close={close} _onClick={() => openSettings(dispatch)}>
                Change Background...
              </Button>
              <hr className="w-full border-pop-900" />
              <Button close={close} _onClick={() => openSettings(dispatch)}>
                Display Settings
              </Button>
              <Button close={close} _onClick={() => openSettings(dispatch)}>
                Settings
              </Button>
            </>
          )}
        </div>
      ) : null}
      {menu ? menu : null}
    </>
  );
};
export default ContextMenu;
