const express = require("express");
const app = express();
const port = 8080;

const fruitsHome = require("./json/fruits-home.json");
const fruitsError = require("./json/fruits-error.json");
const fruitsList = require("./json/fruits.json");

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
