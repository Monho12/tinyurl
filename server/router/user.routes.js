const express = require("express");
const {
  loginUser,
  getUser,
  createUser,
  getUsers,
  Verify,
} = require("../controller/user.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .post("/login", loginUser)
  .get("/users", authMiddleware, getUsers)
  .get("/users/:id", authMiddleware, getUser)
  .get("/verify", Verify)
  .post("/signup", createUser);

module.exports.userRoutes = router;
