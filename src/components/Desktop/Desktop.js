import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import Background from "../Background/Background";
import Icon from "./Icons/Icon";
import CodeFile from "../svg/CodeFile";
import ApplicationWindow from "../ApplicationWindow/ApplicationWindow";
import { openJSRacer } from "../../js/dispatch";

const openApp = (apps) => {
  return apps.map(({ title, src }, i) => (
    <ApplicationWindow key={i.toString()} name={title} file={src} />
  ));
};

const Desktop = () => {
  const { state, dispatch } = useContext(UserContext);

  return (
    <div className="flex flex-col justify-center w-full h-screen relative">
      <Background />
      <section className="z-0 h-full justify-items-center items-center grid grid-cols-10 gap-1 grid-rows-6 grid-">
        <Icon
          title="JS Racer"
          Svg={CodeFile}
          handleDoubleClick={() => openJSRacer(dispatch)}
        />
        <Icon title="lmoa" />
      </section>
      {state.apps?.length ? openApp(state.apps) : null}
    </div>
  );
};
export default Desktop;
