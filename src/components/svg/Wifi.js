const max = (
  <svg
    height="22"
    id="svg6530"
    svg="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 22 22"
    width="22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="layer1" transform="translate(-33.000202,-205.36047)">
      <rect
        clipPath="none"
        height="22"
        id="rect6303-3"
        style={{
          color: "#bebebe",
          display: "inline",
          overflow: "visible",
          visibility: "visible",
          fill: "none",
          stroke: "none",
          strokeWidth: "1",
          marker: "none",
        }}
        transform="matrix(0,-1,1,0,0,0)"
        width="22"
        x="-227.36047"
        y="33.000202"
      />
      <path
        d="m 44,211.36216 c -3.03435,0 -5.76588,1.07815 -8.03125,2.75 l 8.03125,8.75 7.96875,-8.78125 C 49.71214,212.42762 47.01105,211.36216 44,211.36216 Z"
        id="path3074"
        fill="currentColor"
        style={{
          color: "currentColor",
          display: "inline",
          overflow: "visible",
          visibility: "visible",
          fill: "currentColor",
          fillOpacity: "1",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: "1",
          marker: "none",
          enableBackground: "accumulate",
        }}
      />
    </g>
  </svg>
);

const off = (
  <svg
    height="22"
    id="svg6530"
    version="1.1"
    viewBox="0 0 22 22"
    width="22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="layer1" transform="translate(-177.0002,-205.36047)">
      <path
        d="m 190.9373,220.36552 0,1 c 0,0.27614 0.10029,0.53779 0.28125,0.71875 l 0.78125,0.78125 -0.78125,0.78125 c -0.18096,0.18096 -0.28125,0.44261 -0.28125,0.71875 l 0,1 1,0 c 0.27614,0 0.53779,-0.10029 0.71875,-0.28125 l 0.78125,-0.78125 0.78125,0.78125 c 0.18096,0.18096 0.44261,0.28125 0.71875,0.28125 l 1,0 0,-1 c 0,-0.27614 -0.10029,-0.53779 -0.28125,-0.71875 l -0.78125,-0.78125 0.78125,-0.78125 c 0.18096,-0.18096 0.28125,-0.44261 0.28125,-0.71875 l 0,-1 -1,0 c -0.27614,0 -0.53779,0.10029 -0.71875,0.28125 l -0.78125,0.78125 -0.78125,-0.78125 c -0.18096,-0.18096 -0.44261,-0.28125 -0.71875,-0.28125 l -1,0 z"
        id="path5898-0-9"
        style={{
          display: "inline",
          fill: "#555555",
          fillOpacity: "1",
          stroke: "none",
          enableBackground: "new",
        }}
      />
      <rect
        clipPath="none"
        height="22"
        id="rect10347"
        style={{
          color: "#bebebe",
          display: "inline",
          overflow: "visible",
          visibility: "visible",
          fill: "none",
          stroke: "none",
          strokeWidth: "1",
          marker: "none",
        }}
        transform="matrix(0,-1,1,0,0,0)"
        width="22"
        x="-227.36047"
        y="177.0002"
      />
      <path
        d="m 188,211.36216 c -3.03435,0 -5.76588,1.07815 -8.03125,2.75 l 8.03125,8.75 7.96875,-8.78125 c -2.25661,-1.65329 -4.9577,-2.71875 -7.96875,-2.71875 z"
        id="path10349"
        style={{
          color: "currentColor",
          display: "inline",
          overflow: "visible",
          visibility: "visible",
          opacity: "0.35",
          fill: "#555555  ",
          fillOpacity: "1",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: "1",
          marker: "none",
          enableBackground: "accumulate",
        }}
      />
    </g>
  </svg>
);

const Wifi = ({ state }) => {
  return state ? max : off;
};
export default Wifi;
