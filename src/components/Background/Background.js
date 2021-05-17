import img from "url:../../images/dragisa-braunovic.jpg?as=webp"; //eslint-disable-line

const Background = () => (
  <img
    className="absolute z-30 h-screen w-max rounded-md top-0 object-cover pointer-events-none"
    src={img}
    alt="background vista of some mountainside overlooking a town"
  />
);
export default Background;
