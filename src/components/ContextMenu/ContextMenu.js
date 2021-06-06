import { useEffect } from "react";
import Button from "../Dropdown/Button";
import { openSettings, openNewFolder } from "../../js/dispatch";

const ContextMenu = ({
  position,
  close,
  context: {
    state: { desktopContext },
    dispatch,
  },
  position: { screenRects },
}) => {
  const closeMenu = (e) =>
    e.key === "Escape" || e.type === "click" ? close() : null;

  if (position.x + 192 >= screenRects.width) {
    position.x = position.x - 192;
  }
  if (position.y + 231 >= screenRects.bottom) {
    position.y = position.y - 231;
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
  return (
    <div
      className="absolute w-48 py-1 rounded z-50 text-gray-100 bg-gray-800 border border-gray-700 "
      style={{ top: position.y - screenRects.y, left: position.x }}
      role="presentation"
      onKeyDown={closeMenu}
    >
      {/* The component 'Desktop's onContextMenu handler prevents default, maps icons with custom handelUseContext to save icon name and onDoubleClick to Context, context Menu watches this on render to complete application context.*/}
      {desktopContext.title ? (
        <>
          <Button close={close} _onClick={desktopContext.onClick}>
            Open {desktopContext.title}{" "}
          </Button>
          <Button close={close}>Cut</Button>
          <Button close={close}>Copy</Button>
          <Button close={close}>Rename...</Button>
          <Button close={close}>Move to Trash</Button>
          <hr className="w-full border-gray-900" />
          <Button close={close}>Properties</Button>
          <hr className="w-full border-gray-900" />
          <Button close={close}>Show in Files</Button>
        </>
      ) : (
        <>
          <Button close={close} _onClick={() => openNewFolder(dispatch)}>
            New Folder
          </Button>
          <hr className="w-full border-gray-900" />
          <Button close={close}>Paste</Button>
          <hr className="w-full border-gray-900" />
          <Button close={close}>Select All</Button>
          <hr className="w-full border-gray-900" />
          <Button close={close}>Show Desktop in Files</Button>
          <Button close={close}>Open in Terminal</Button>
          <hr className="w-full border-gray-900" />
          <Button close={close} _onClick={() => openSettings(dispatch)}>
            Change Background...
          </Button>
          <hr className="w-full border-gray-900" />
          <Button close={close} _onClick={() => openSettings(dispatch)}>
            Display Settings
          </Button>
          <Button close={close} _onClick={() => openSettings(dispatch)}>
            Settings
          </Button>
        </>
      )}
    </div>
  );
};
export default ContextMenu;
