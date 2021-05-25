import { render } from "react-dom";
import { useReducer, useContext, lazy, Suspense } from "react";
import { UserContext, reducer } from "./context/UserContext";

import Background from "./components/Background/Background";
import Nav from "./components/Nav/Nav";
import SearchBar from "./components/SearchBar/SearchBar";
import Time from "./components/Time/Time";

const ApplicationWindow = lazy(() =>
  import("./components/ApplicationWindow/ApplicationWindow")
);

const App = () => {
  const initial = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initial);

  const openApp = (apps) => {
    return apps.map(({ title, src }, i) => (
      <Suspense key={i.toString()} fallback={<div>Nothign here yet</div>}>
        <ApplicationWindow name={title} file={src} />
      </Suspense>
    ));
  };

  console.log(state);

  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-hidden ">
        {/* top status bar */}

        <UserContext.Provider value={{ state, dispatch }}>
          <Nav />
          <div className="flex  flex-col justify-center w-full h-screen relative">
            <Background brightness={state.display} />
            {/* This is where the contents of the screen will go */}
            <section className="z-40">
              <Time />
              <div className="flex mt-4 justify-center items-center w-full">
                <SearchBar />
                <button
                  className="p2 bg-yellow-300"
                  onClick={() => {
                    dispatch({
                      type: "openApp",
                      payload: {
                        title: "Javascript-Racer",
                        src: "https://js-racer-clone.herokuapp.com/",
                      },
                    });
                    // console.log(state);
                  }}
                >
                  click
                </button>
              </div>
            </section>
          </div>
        </UserContext.Provider>
      </div>
      {state.apps?.length ? openApp(state.apps) : null}
    </>
  );
};

render(<App />, document.getElementById("root"));
