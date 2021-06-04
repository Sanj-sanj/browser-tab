import { useEffect } from "react";
import Button from "../Dropdown/Button";
import { openSettings } from "../../js/dispatch";

const ContextMenu = ({
  position,
  close,
  context: { state, dispatch },
  position: { screenRects },
}) => {
  const closeMenu = (e) => (e.key === "Escape" ? close() : null);

  if (position.x + 192 >= screenRects.width) {
    position.x = position.x - 192;
  }
  if (position.y + 231 >= screenRects.bottom) {
    position.y = position.y - 231;
  }

  useEffect(() => {
    const body = document.body;
    body.addEventListener("keydown", closeMenu);
    return () => {
      body.removeEventListener("keydown", closeMenu);
    };
  });
  return (
    <div
      className="absolute w-48 py-1 rounded z-50 text-gray-100 bg-gray-800 border border-gray-700 "
      style={{ top: position.y - screenRects.y, left: position.x }}
      role="presentation"
      onKeyDown={closeMenu}
    >
      <Button close={close}>New Folder</Button>
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
    </div>
  );
};
export default ContextMenu;
