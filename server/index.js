const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const { userRoutes } = require("./router/user.routes");
const { urlRoutes } = require("./router/url.routes");
require("dotenv").config();

const port = process.env.PORT;

const app = express();

connect();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);
app.use(urlRoutes);

app.get("/", (_req, res) => {
  res.send("H3ll0 aDm1n!");
});

app.listen(port, () => {
  console.log(`Listening on port : ${port} `);
});
