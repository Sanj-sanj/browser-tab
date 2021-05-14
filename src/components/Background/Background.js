import img from "url:../../images/dragisa-braunovic.jpg?as=webp";

const Background = () => (
  <img
    className="absolute h-screen w-max  object-cover"
    src={img}
    alt="background vista of some mountainside overlooking a town"
  />
);
export default Background;
