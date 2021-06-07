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
      .querySelector("section.z-10.h-full.w-full")
      .getBoundingClientRect();
    setMenu({ x: e.pageX, y: e.pageY, screenRects });
  };

  const openApp = (apps) => {
    return apps.map(({ title, src, active, id }) =>
      active ? (
        <ApplicationWindow
          key={id}
          name={title}
          file={src}
          dispatch={dispatch}
          id={id}
          state={state}
        />
      ) : null
    );
  };

  return (
    <>
      <section
        className="z-10 h-full w-full flex flex-col items-end"
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
        {state.dirs.desktop.map(
          ({ title, Svg, handleDoubleClick, handleContextMenu }) => {
            return (
              <Icon
                title={title}
                key={title}
                Svg={Svg}
                handleDoubleClick={() => handleDoubleClick(dispatch)}
                handleContextMenu={() =>
                  handleContextMenu(dispatch, title, () =>
                    handleDoubleClick(dispatch)
                  )
                }
                makeContextMenu={makeContextMenu}
              />
            );
          }
        )}
      </section>
      {state.apps?.length ? openApp(state.apps) : null}
      {menu.y ? (
        <ContextMenu
          position={menu}
          close={() => clearMenuAndMenuContext()}
          context={{ state, dispatch }}
        />
      ) : null}
    </>
  );
};
export default Desktop;
