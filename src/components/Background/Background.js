import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
// import img from "url:../../images/dragisa-braunovic.jpg?as=webp"; //eslint-disable-line
// import axios from "axios";

const getImage = async (setImage, name) => {
  fetch(`http://localhost:1234/background/${name}`)
    .then((res) => res.blob())
    .then((img) => {
      console.log(img);
      setImage(URL.createObjectURL(img));
    });
  // let img = await axios.get(`http://localhost:1234/background/${name}`);
  // console.log(img.data.blob());
  // setImage("data:image/png;charset=utf-8;base64," + img.data);
};

const Background = () => {
  const [image, setImage] = useState(null);

  const { state } = useContext(UserContext);
  const { background } = state;
  let brightness = state?.display ?? 10;
  brightness = 10 - parseInt(brightness) + "0";

  useEffect(() => {
    image === null ? getImage(setImage, background) : null;
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
        alt={" montage of abstract, artistic honeycombs by Kate Hazen."}
      />
    </>
  );
};
export default Background;
