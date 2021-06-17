import { render } from "react-dom";
import { useReducer, useContext } from "react";
import { UserContext, reducer } from "./context/UserContext";

import Nav from "./components/Nav/Nav";
import Screen from "./components/Screen/Screen";
import Lock from "./components/Lock/Lock";

const App = () => {
  const initial = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initial);

  console.log(state);

  return (
    <>
      <div className="flex flex-col w-full h-screen select-none">
        <UserContext.Provider value={{ state, dispatch }}>
          {state.activeView === "Lock" ? (
            <Lock
              user={state.user}
              unlock={() =>
                dispatch({ type: "updateActiveView", payload: "Desktop" })
              }
            />
          ) : (
            <>
              <Nav />
              <Screen />
            </>
          )}
        </UserContext.Provider>
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
