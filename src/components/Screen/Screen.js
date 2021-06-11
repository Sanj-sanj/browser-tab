import { lazy, useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "../../context/UserContext";

import Background from "../Background/Background";
const Activities = lazy(() => import("./Activities/Activities"));
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
    activeView
      ? setTimeout(() => setView(<Desktop />), 100)
      : (animationTimeout = setTimeout(
          () =>
            setView(
              <Suspense fallback={<div></div>}>
                <Activities state={activeView} />
              </Suspense>
            ),
          0
        ));
    return () => clearTimeout(animationTimeout);
  }, [activeView]);

  return (
    <>
      <div
        className={`absolute top-0 w-screen h-screen pointer-events-none ${
          parseInt(brightness) <= 0 ? "bg-transparent" : "bg-black"
        } bg-opacity-${brightness === "100" ? "95" : brightness}`}
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
