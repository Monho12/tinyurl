const express = require("express");
const { loginUser, signupUser } = require("../controller/auth.controller");
const {
  getUser,

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
  .post("/signup", signupUser);

module.exports.userRoutes = router;
