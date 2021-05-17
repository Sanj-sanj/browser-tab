import { render } from "react-dom";
import Background from "./components/Background/Background";
import Nav from "./components/Nav/Nav";
import SearchBar from "./components/SearchBar/SearchBar";
import Time from "./components/Time/Time";

const App = () => {
  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-hidden">
        {/* top status bar */}
        <Nav />
        <div className="flex  flex-col justify-center w-full h-screen relative">
          <Background />
          {/* This is where the contents of the screen will go */}
          <section className="z-40">
            <Time />
            <div className="flex mt-4 justify-center items-center w-full">
              <SearchBar />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
