const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bgData = require("./bgData");
const sharp = require("sharp");
const app = express();
const port = process.env.PORT || "1234";

var corsOptions = {
  origin: "http://localhost:1234",
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

app.get("/background/:name?", cors(corsOptions), (req, res) => {
  const { name } = req.params;

  const background = bgData.find((obj) => obj.name === name);
  const imageToUse = __dirname + background.src;
  console.log(imageToUse);
  const converted = sharp(imageToUse)
    .webp({ quality: 75 })
    .toFile(__dirname + background.src.split(".")[0] + "-converted.webp");
  console.log(converted);
  res.sendFile(imageToUse);
  console.log("sending background " + background.name);
});

app.get("/backgroundalts/:name?", cors(corsOptions), (req, res) => {
  const { name } = req.params;
  const which = bgData.find((obj) => obj.name === name);
  res.status(200).json(which.alt);
  console.log("sent background's alt");
});
