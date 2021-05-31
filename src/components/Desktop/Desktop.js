import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import Background from "../Background/Background";
import Icon from "./Icons/Icon";
import CodeFile from "../svg/CodeFile";
import ApplicationWindow from "../ApplicationWindow/ApplicationWindow";
import { openJSRacer } from "../../js/dispatch";
import Activities from "../Activities/Activities";

const Desktop = () => {
  const { state, dispatch } = useContext(UserContext);
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
      <div className="flex flex-col justify-center w-full h-screen relative">
        <Background />
        {state?.activeView ? (
          <>
            <section className="z-10 h-full justify-items-center items-center grid grid-cols-10 gap-1 grid-rows-6">
              <Icon
                title="JS Racer"
                Svg={CodeFile}
                handleDoubleClick={() => openJSRacer(dispatch)}
              />
              <Icon title="lmoa" />
            </section>
            {state.apps?.length ? openApp(state.apps) : null}
          </>
        ) : (
          <Activities />
        )}
      </div>
    </>
  );
};
export default Desktop;
