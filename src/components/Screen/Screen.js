import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

import Background from "../Background/Background";
import Activities from "./Activities/Activities";
import Desktop from "./Desktop/Desktop";

const Screen = () => {
  const {
    state: { display, activeView, background },
  } = useContext(UserContext);
  const [view, setView] = useState(null);

  let brightness = display ?? 10;
  brightness = 10 - parseInt(brightness) + "0";

  useEffect(() => {
    let animationTimeout;

    activeView === "Desktop"
      ? setTimeout(() => setView(<Desktop />), 150)
      : activeView === "Activities"
      ? (animationTimeout = setTimeout(
          () => setView(<Activities state={activeView} />),
          150
        ))
      : null;
    return () => clearTimeout(animationTimeout);
  }, [activeView]);

  return (
    <>
      <div
        className={`absolute top-0 w-screen h-screen pointer-events-none ${
          parseInt(brightness) <= 0 ? "bg-transparent" : "bg-black"
        } ${
          brightness === "100" ? "bg-opacity-95" : "bg-opacity-" + brightness
        }`}
        style={{ zIndex: "100" }}
      />
      <div className="flex flex-col justify-center w-full h-screen relative rounded-t-lg overflow-hidden">
        <Background background={background} />
        {view}
      </div>
    </>
  );
};
export default Screen;
