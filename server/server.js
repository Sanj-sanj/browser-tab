const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || "1234";

var corsOptions = {
  origin: "http://localhost:5983",
  methods: "GET,POST",
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.options("/backgrounds", cors(corsOptions));
app.use(express.static(__dirname, +"/images"));

app.listen(port, () => {
  console.log(`listening on https://localhost:1234`);
});

const bgs = [
  {
    name: "Honeycomb",
    src: "/images/Honeycomb-Kate-Hazen.png",
    alt: "A fractal honeycomb background by Kate-Hazen of System76.",
  },
  {
    name: "Dragisa",
    src: "/images/dragisa-braunovic.jpg",
    alt: "A vista overlooking a town by Dragisa Braunovic.",
  },
  {
    name: "Robot",
    src: "/images/Robot-Kate-Hazen.png",
    alt: "A minimal Robot background by Kate-Hazen of System76.",
  },
  {
    name: "Mountain",
    src: "/images/Mountains-Kate-Hazen.png",
    alt: "A cascading fractal background by Kate-Hazen of System76.",
  },
];

app.get("/background/:name?", cors(corsOptions), (req, res) => {
  const { name } = req.params;
  if (name === "All") {
    const images = bgs.map((obj) => {
      return { name: obj.name, src: __dirname + obj.src };
    });
    console.log(images);
    return res.status(200).json(images);
  }
  const background = bgs.find((obj) => obj.name === name);
  const imageToUse = __dirname + background.src;
  res.sendFile(imageToUse);
  console.log("sending background " + background.name);
});

app.get("/backgroundalts/:name?", cors(corsOptions), (req, res) => {
  const { name } = req.params;
  const which = bgs.find((obj) => obj.name === name);
  res.status(200).json(which.alt);
  console.log("sent background's alt");
});
