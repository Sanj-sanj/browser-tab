import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import img from "url:../../images/dragisa-braunovic.jpg?as=webp"; //eslint-disable-line

const backgrounds = [
  {
    name: "dragisa-braunovic",
    src: "../../images/dragisa-braunovic.jpg",
    alt: "Vista of a mountainside overlooking a small town enveloping a bay.",
  },
];

const getBg = (state) => {
  const toUse = backgrounds.filter((item) =>
    item.name === state.background.name ? item : null
  );
  return toUse[0];
};

const Background = () => {
  const { state } = useContext(UserContext);
  let brightness = state?.display ?? 10;
  const currBG = getBg(state);
  brightness = 10 - parseInt(brightness) + "0";
  return (
    <>
      <div
        className={`absolute bottom-0 w-screen h-screen pointer-events-none ${
          parseInt(brightness) <= 0 ? "bg-transparent" : "bg-black"
        } bg-opacity-${brightness === "100" ? "95" : brightness}`}
        style={{ zIndex: "100" }}
      ></div>
      <img
        className="absolute z-0 h-screen w-max rounded-md top-0 object-cover pointer-events-none"
        src={img}
        alt={currBG.alt}
      />
    </>
  );
};
export default Background;
