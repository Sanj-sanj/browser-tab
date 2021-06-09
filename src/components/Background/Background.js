import { useEffect, useState } from "react";

const Background = ({ background }) => {
  const [image, setImage] = useState(null);
  const [alt, setAlt] = useState(null);

  const getImage = async (name) => {
    fetch(`http://localhost:1234/background/${name}`)
      .then((res) => {
        // return res.body ;
        // console.log(res.body);
        return res.blob();
      })
      .then((img) => {
        console.log(img);
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
      <img
        className="absolute z-0 h-screen w-max rounded-md top-0 object-cover pointer-events-none"
        src={image}
        alt={alt}
      />
    </>
  );
};
export default Background;
