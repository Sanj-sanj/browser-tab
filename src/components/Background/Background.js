import img from "url:../../images/dragisa-braunovic.jpg?as=webp"; //eslint-disable-line
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Background = () => {
  const { state } = useContext(UserContext);
  let brightness = state?.display ?? 10;

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
        alt="background vista of some mountainside overlooking a town"
      />
    </>
  );
};
export default Background;
