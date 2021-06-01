import { render } from "react-dom";
import { useReducer, useContext } from "react";
import { UserContext, reducer } from "./context/UserContext";

import Nav from "./components/Nav/Nav";
import Screen from "./components/Screen/Screen";

const App = () => {
  const initial = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initial);

  console.log(state);

  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-hidden ">
        <UserContext.Provider value={{ state, dispatch }}>
          {/* top status bar */}
          <Nav />
          <Screen />
        </UserContext.Provider>
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
