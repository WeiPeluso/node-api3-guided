const express = require("express"); // importing a CommonJS module
const morgan = require("morgan"); // third party, need npm install morgan

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

server.use(morgan("combined"));
//server.use(gatekeeper);
server.use(express.json());
server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.post("/cars", addDoor, addMirror, (req, res) => {
  res.status(200).json(req.car);
});

function addMirror(req, res, next) {
  req.car.door.mirror = "cool mirror";
  next();
}

function addDoor(req, res, next) {
  let car = req.body;
  car.door = {};
  req.car = car;
  next();
}

function gatekeeper(req, res, next) {
  //return 401 when the second on the clock are devisible by 2
  //read the seconds
  //if second are a multiple of 3, return 401
  // if not , call next()

  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(401).json({ you: "cannot pass!" });
  } else {
    next();
  }
}

module.exports = server;
