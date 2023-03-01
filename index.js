require("dotenv").config()

const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.PORT;

const fruitsHome = require("./json/fruits-home.json");
const fruitsError = require("./json/fruits-error.json");
const fruitsList = require("./json/fruits.json");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.status(200).send(fruitsHome);
  } catch (e) {
    res.status(404).send(fruitsHome);
  }
});

app.get("/fruits", (req, res) => {
  try {
    res.status(200).send(fruitsList);
  } catch (e) {
    res.status(404).send(fruitsList);
  }
});

app.get("/fruits/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const fruit = fruitsList.find((fruit) => fruit.name.toLowerCase() == name);
  if (!fruit) {
      res.status(404).send(fruitsError);
  } else {
      res.send(fruit);
  }
});

app.listen(port, () => {
  console.log(`App is now listening to ${port}`);
});
