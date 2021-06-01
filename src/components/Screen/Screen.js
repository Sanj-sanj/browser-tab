import { lazy, useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "../../context/UserContext";

import Background from "../Background/Background";
// import Activities from "./Activities/Activities";
const Activities = lazy(() => import("./Activities/Activities"));
import Desktop from "./Desktop/Desktop";

const Screen = () => {
  const { state } = useContext(UserContext);
  const { activeView } = state;
  const [view, setView] = useState(null);

  useEffect(() => {
    let animationTimeout;
    activeView
      ? setTimeout(() => setView(<Desktop />), 100)
      : (animationTimeout = setTimeout(
          () =>
            setView(
              <Suspense fallback={<div></div>}>
                <Activities state={state.activeView} />
              </Suspense>
            ),
          0
        ));
    return () => clearTimeout(animationTimeout);
  }, [activeView]);

  return (
    <>
      <div className="flex flex-col justify-center w-full h-screen relative">
        <Background />
        {view}
      </div>
    </>
  );
};
export default Screen;
