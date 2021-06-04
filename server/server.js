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
  { name: "Honeycomb", src: "/images/Honeycomb-Kate-Hazen.png" },
  { name: "Dragisa", src: "/images/dragisa-braunovic.jpg" },
  { name: "Robot", src: "/images/Robot-Kate-Hazen.png" },
  { name: "Mountain", src: "/images/Mountains-Kate-Hazen.png" },
];

app.get("/background/:name?", cors(corsOptions), (req, res) => {
  console.log(req.params);
  const { name } = req.params;
  if (name === "All") {
    const images = bgs.map((obj) => {
      return { name: obj.name, src: __dirname + obj.src };
    });
    console.log(images);
    return res.status(200).json(images);
  }

  const which = bgs.find((obj) => obj.name === name);
  const imageToUse = __dirname + which.src;

  return res.sendFile(imageToUse);
});

// app.post("/backgrounds", cors(corsOptions), (req, res) => {
//   console.log("POST");
// app.use(express.static(__dirname, +"/images"));
// const toSend = bgs.find((obj) => obj.name === req.body.name);
// return res.sendFile(__dirname + toSend.src);
// const imageToUse = __dirname + toSend.src;
// const datatoUse = Buffer.from(imageToUse, "base64");
// fs.readFile(imageToUse, (e) => console.log(e));

// const reader = new FileReader();
// reader.readAsDataURL(blob.default);
// reader.readAsBinaryString()
// const data = reader.result;
// console.log(datatoUse);
// return res
//   .writeHead(200, {
//     "Content-Type": "image/png",
//     "Content-Length": datatoUse.length,
//   })
//   .end(datatoUse);

// res.type("png").send(datatoUse);

// return res.sendFile(imageToUse);

// console.log("accessed by cors bri");
// });
