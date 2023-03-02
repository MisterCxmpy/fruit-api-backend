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

app.get("/", (req, res) => {
  res.send(fruitsHome);
});

app.get("/fruits", (req, res) => {
  res.send(fruitsList);
});

app.get("/fruits/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const fruit = fruitsList.find((fruit) => fruit.name.toLowerCase() == name);

  if (fruit == undefined) {
      res.status(404).send(fruitsError);
  } else {
      res.send(fruit);
  }
});

const ids = fruitsList.map((fruit) => fruit.id);
let maxId = Math.max(...ids);

app.post("/fruits/add", (req, res) => {
    const fruit = fruitsList.find((fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase());

    if (fruit != undefined) {
        res.status(409).send();
    } else {
        maxId += 1;
        req.body.id = maxId;

        fruitsList.push(req.body);

        res.status(201).send(req.body);
    }
});

app.listen(port, () => {
  console.log(`App is now listening to ${port}`);
});
