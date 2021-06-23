import { useEffect, useState } from "react";
import bgData from "./bgData";
/* eslint-disable */
import Dragisa from "url:../../images/wallpapers/dragisa-braunovic-converted.webp";
import Honeycomb from "url:../../images/wallpapers/Honeycomb-Kate-Hazen-converted.webp";
import Mountain from "url:../../images/wallpapers/Mountains-Kate-Hazen-converted.webp";
import Robot from "url:../../images/wallpapers/Robot-Kate-Hazen-converted.webp";
import Sunset from "url:../../images/wallpapers/Sunset-Sides-Imagery-converted.webp";
import Minimal1 from "url:../../images/wallpapers/min1-converted.webp";
import Minimal2 from "url:../../images/wallpapers/min2-converted.webp";
import Sunrise from "url:../../images/wallpapers/sunrise-painting-converted.webp";
import Pop_Horizon from "url:../../images/wallpapers/Pop-horizon-converted.webp";
/* eslint-enable */
const backgrounds = {
  Mountain,
  Honeycomb,
  Pop_Horizon,
  Robot,
  Dragisa,
  Sunset,
  Sunrise,
  Minimal1,
  Minimal2,
};

const Background = ({ background, dimmed }) => {
  const [image, setImage] = useState(null);
  const [alt, setAlt] = useState(null);
  useEffect(() => {
    setImage(backgrounds[background]);
    setAlt(bgData.find((bg) => bg.name === background).alt);
  }, [background]);

  return (
    <>
      <div
        className={`w-full h-full absolute top-0 ${
          dimmed ? "bg-pop-900 bg-opacity-90 z-10" : ""
        }`}
      >
        {" "}
      </div>
      <img
        className={`absolute z-0 h-screen w-max rounded-md top-0 object-cover pointer-events-none
        ${dimmed ? "filter blur-lg" : ""}
        `}
        src={image}
        alt={alt}
      />
    </>
  );
};
export default Background;
