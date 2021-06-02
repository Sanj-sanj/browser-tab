import { openJSRacer } from "../../../js/dispatch";
import ApplicationWindow from "../../ApplicationWindow/ApplicationWindow";
import CodeFile from "../../svg/CodeFile";
import Icon from "../Icons/Icon";
import ContextMenu from "../../ContextMenu/ContextMenu";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const Desktop = () => {
  const { state, dispatch } = useContext(UserContext);
  const [menu, setMenu] = useState({ x: 0, y: 0 });

  const openApp = (apps) => {
    return apps.map(({ title, src, active, id }) =>
      active ? (
        <ApplicationWindow
          key={id}
          name={title}
          file={src}
          dispatch={dispatch}
          id={id}
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
          const screenRects = document
            .querySelector("section.z-10.h-full.w-full")
            .getBoundingClientRect();
          setMenu({ x: e.pageX, y: e.pageY, screenRects });
        }}
        role="presentation"
        onClick={() => (menu.y ? setMenu({ x: 0, y: 0 }) : null)}
        onKeyDownCapture={(e) =>
          e.key === "Escape" ? setMenu({ x: 0, y: 0 }) : null
        }
      >
        <Icon
          title="JS Racer"
          Svg={CodeFile}
          handleDoubleClick={() => openJSRacer(dispatch)}
        />
        <Icon title="lmoa prcoessing file" />
      </section>
      {state.apps?.length ? openApp(state.apps) : null}
      {menu.y ? (
        <ContextMenu position={menu} close={() => setMenu({ x: 0, y: 0 })} />
      ) : null}
    </>
  );
};
export default Desktop;
