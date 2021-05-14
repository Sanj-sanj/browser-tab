import { useState } from "react";
import { render } from "react-dom";

import Background from "./components/Background/Background";
import Header from "./components/Header/Header";
import Time from "./components/Time/Time";

const App = () => {
  const [user, setUser] = useState(() => localStorage.getItem("user") || "");

  return (
    <>
      <Background />
      <div className="flex  flex-col justify-center w-full min-h-screen z-10 relative">
        <Header />
        <Time />
        <button onClick={() => console.log(user)}>click</button>
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
