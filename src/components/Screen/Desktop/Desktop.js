import ApplicationWindow from "../../ApplicationWindow/ApplicationWindow";
import Icon from "../Icons/Icon";
import ContextMenu from "../../ContextMenu/ContextMenu";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { clearDesktopContext } from "../../../js/dispatch";

const Desktop = () => {
  const { state, dispatch } = useContext(UserContext);
  const [menu, setMenu] = useState({ x: 0, y: 0 });

  const clearMenuAndMenuContext = () => {
    setMenu({ x: 0, y: 0 });
    clearDesktopContext(dispatch);
  };
  const makeContextMenu = (e) => {
    const screenRects = document
      .querySelector("section.desktopScreen")
      .getBoundingClientRect();
    setMenu({ x: e.pageX, y: e.pageY, screenRects });
  };

  const openApp = (apps) => {
    return apps.map(({ type, title, src, active, id }) =>
      active ? (
        <ApplicationWindow
          key={id}
          name={title}
          type={type}
          src={src}
          dispatch={dispatch}
          id={id}
          state={state}
          clearDesktopContext={clearMenuAndMenuContext}
        />
      ) : null
    );
  };

  return (
    <section
      className="desktopScreen h-full w-full z-10"
      onContextMenu={(e) => {
        e.preventDefault();
        clearMenuAndMenuContext();
        makeContextMenu(e);
      }}
      role="presentation"
      onClick={() => (menu.y ? clearMenuAndMenuContext() : null)}
      onKeyDownCapture={(e) =>
        e.key === "Escape" ? clearMenuAndMenuContext() : null
      }
    >
      <div
        className=" w-min flex flex-col max-h-screen flex-wrap p-0.5"
        style={{ height: "inherit" }}
      >
        {state.dirs.desktop.map(
          ({ title, id, icon, handleDoubleClick, handleContextMenu }) => {
            if (title)
              return (
                <Icon
                  title={title}
                  key={id}
                  Icon={icon}
                  handleDoubleClick={() => handleDoubleClick(dispatch)}
                  handleContextMenu={(e) =>
                    handleContextMenu(dispatch, title, id, "desktop", e, () =>
                      handleDoubleClick(dispatch)
                    )
                  }
                  makeContextMenu={makeContextMenu}
                />
              );
          }
        )}
      </div>
      {state.apps?.length ? openApp(state.apps) : null}
      {menu.y ? (
        <ContextMenu
          position={menu}
          close={() => clearMenuAndMenuContext()}
          context={{ state, dispatch }}
        />
      ) : null}
    </section>
  );
};
export default Desktop;
