import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

import Background from "../Background/Background";
import Lock from "../Lock/Lock";
import Activities from "./Activities/Activities";
import Desktop from "./Desktop/Desktop";

const Screen = () => {
  const {
    state: { user, display, activeView, background },
    dispatch,
  } = useContext(UserContext);
  const [view, setView] = useState(null);

  useEffect(() => {
    let animationTimeout;
    activeView === "Lock"
      ? setView(
          <Lock
            user={user}
            unlock={() =>
              dispatch({ type: "updateActiveView", payload: "Desktop" })
            }
          />
        )
      : activeView === "Desktop"
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
        className={`absolute top-0 w-screen h-screen pointer-events-none bg-black`}
        style={{
          zIndex: "100",
          opacity: 1 - (display / 10) * 1 === 1 ? 0.92 : 1 - (display / 10) * 1,
        }}
      />
      <div
        className={`flex flex-col justify-center w-full h-screen relative rounded-t-lg overflow-hidden`}
      >
        <Background background={background} activeView={activeView} />
        {view}
      </div>
    </>
  );
};
export default Screen;
