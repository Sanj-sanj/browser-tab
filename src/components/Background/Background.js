import { useEffect, useState } from "react";
import bgData from "./bgData";
/* eslint-disable */
import Dragisa from "url:./images/dragisa-braunovic-converted.webp";
import Honeycomb from "url:./images/Honeycomb-Kate-Hazen-converted.webp";
import Mountain from "url:./images/Mountains-Kate-Hazen-converted.webp";
import Robot from "url:./images/Robot-Kate-Hazen-converted.webp";
import Sunset from "url:./images/Sunset-Sides-Imagery-converted.webp";
import Minimal1 from "url:./images/min1-converted.webp";
import Minimal2 from "url:./images/min2-converted.webp";
import Sunrise from "url:./images/sunrise-painting-converted.webp";
/* eslint-enable */
const backgrounds = {
  Mountain,
  Honeycomb,
  Robot,
  Dragisa,
  Sunset,
  Sunrise,
  Minimal1,
  Minimal2,
};

const Background = ({ background, activeView }) => {
  const [image, setImage] = useState(null);
  const [alt, setAlt] = useState(null);

  useEffect(() => {
    setImage(backgrounds[background]);
    setAlt(bgData.find((bg) => bg.name === background).alt);
  }, [background]);

  return (
    <>
      <img
        className={`absolute z-0 h-screen w-max rounded-md top-0 object-cover pointer-events-none ${
          activeView === "Lock" ? "filter blur-2xl" : ""
        }`}
        src={image}
        alt={alt}
      />
    </>
  );
};
export default Background;
