const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const { userRoutes } = require("./router/user.routes");
const { urlRoutes } = require("./router/url.routes");
require("dotenv").config();

const app = express();

connect();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);
app.use(urlRoutes);

app.get("/", (_req, res) => {
  res.send("Hello Admin!");
});

app.listen(7000, () => {
  console.log("Listening on port 7000!");
});
