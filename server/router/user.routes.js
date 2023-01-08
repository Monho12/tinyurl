const express = require("express");
const {
  loginUser,
  getUser,
  createUser,
  getUsers,
} = require("../controller/user.controller");

const router = express.Router();

router
  .post("/login", loginUser)
  .get("/users", getUsers)
  .get("/users/:id", getUser)
  .post("/signup", createUser);

module.exports.userRoutes = router;
