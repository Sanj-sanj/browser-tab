import { useEffect, useState } from "react";
import Background from "../Background/Background";
import Time from "../Time/Time";

const Lock = ({ user, unlock, background }) => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const listner = (e) =>
      e.key === "Tab" || (e.key === "Enter" && !unlocked)
        ? setUnlocked(!unlocked)
        : null;
    document.body.addEventListener("keydown", listner);
    return () => document.removeEventListener("keydown", listner);
  });

  return (
    <div
      className={`lockScreen z-10 w-full h-screen min-h-full flex flex-col justify-center items-center animate-drop-in `}
      onContextMenu={(e) => e.preventDefault()}
      role="presentation"
      onClick={() => setUnlocked(!unlocked)}
    >
      <div className="absolute w-full h-full">
        <Background background={background} dimmed={true} />
      </div>
      <div
        className={`z-10 ${
          unlocked ? "animate-slide-out-top" : "animate-slide-in-top"
        }`}
        onAnimationEnd={(e) => {
          e.animationName === "slide-out-top"
            ? e.target.classList.add("hidden")
            : e.target.classList.remove("hidden");
        }}
      >
        <Time />
      </div>
      <div
        className={`absolute z-10 flex flex-col items-center justify-center ${
          unlocked ? " animate-slide-in-bottom " : "animate-slide-out-bottom"
        }`}
        onAnimationEnd={(e) => {
          e.animationName === "slide-in-bottom"
            ? (e.target.classList.remove("hidden"),
              e.target.childNodes[2].focus()) //focus input
            : e.target.classList.add("hidden");
        }}
      >
        <div className="w-28 h-28 bg-red-400 rounded-full flex justify-center items-center text-gray-50 text-5xl mb-3">
          {user.slice(0, 1)}
        </div>
        <h2 className="text-2xl mb-6 text-gray-50 ">{user}</h2>
        <input
          className="px-3 py-1 focus:outline-none bg-pop-900 rounded border-2 border-pop-800 focus:border-yellow-100 text-gray-50"
          placeholder="Password"
          type="password"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onKeyDown={(e) => (e.key === "Enter" ? unlock() : null)}
        />
      </div>
    </div>
  );
};

export default Lock;
