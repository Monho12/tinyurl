const express = require("express");
const { createUrl, getUrl, shortUrl } = require("../controller/url.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .get("/urls", authMiddleware, getUrl)
  .get("/:url", shortUrl)
  .post("/urls", createUrl);

module.exports.urlRoutes = router;
