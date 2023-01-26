const express = require("express");
const { loginUser, signupUser } = require("../controller/auth.controller");
const { getUser, getUsers, Verify } = require("../controller/user.controller");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

const router = express.Router();

router
  .post("/login", loginUser)
  .get("/users", roleMiddleware, getUsers)
  .get("/users/:id", roleMiddleware, getUser)
  .get("/verify", Verify)
  .post("/signup", signupUser);

module.exports.userRoutes = router;
