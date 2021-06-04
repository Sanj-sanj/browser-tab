import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Background = () => {
  const [image, setImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const { state } = useContext(UserContext);
  const { background } = state;

  let brightness = state?.display ?? 10;
  brightness = 10 - parseInt(brightness) + "0";

  const getImage = async (name) => {
    fetch(`http://localhost:1234/background/${name}`)
      .then((res) => res.blob())
      .then((img) => {
        setImage(URL.createObjectURL(img));
      });
    fetch(`http://localhost:1234/backgroundalts/${name}`)
      .then((res) => res.json())
      .then((alt) => setAlt(alt));
  };

  useEffect(() => {
    getImage(background);
  }, [background]);

  return (
    <>
      <div
        className={`absolute bottom-0 w-screen h-screen pointer-events-none ${
          parseInt(brightness) <= 0 ? "bg-transparent" : "bg-black"
        } bg-opacity-${brightness === "100" ? "95" : brightness}`}
        style={{ zIndex: "100" }}
      ></div>
      {/* {image} */}
      <img
        className="absolute z-0 h-screen w-max rounded-md top-0 object-cover pointer-events-none"
        src={image}
        alt={alt}
      />
    </>
  );
};
export default Background;
