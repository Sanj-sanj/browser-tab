import { useEffect, useState } from "react";
import Time from "../Time/Time";

const Lock = ({ user, unlock }) => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const listner = (e) =>
      e.key === "Tab" || (e.key === "Enter" && !unlocked)
        ? setUnlocked(!unlocked)
        : null;
    document.body.addEventListener("keydown", listner);
    return () => document.removeEventListener("keydown", listner);
  });
  const rngTimeout = (max, min) =>
    parseInt(Math.random() * (max - min) + min)
      .toFixed(3)
      .replace(".", "");
  return (
    //eslint-disable-next-line
    <div
      className="lockScreen w-full h-full z-10 flex flex-col justify-center items-center bg-black bg-opacity-50 border border-black animate-drop-in"
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => setUnlocked(!unlocked)}
    >
      <div
        className={`${
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
        className={`absolute flex flex-col items-center justify-center ${
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
          onKeyDown={(e) =>
            e.key === "Enter"
              ? setTimeout(() => unlock(), rngTimeout(1.5, 1))
              : null
          }
        />
      </div>
    </div>
  );
};

export default Lock;
