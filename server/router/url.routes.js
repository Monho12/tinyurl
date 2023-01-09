const express = require("express");
const { createUrl, getUrl, shortUrl } = require("../controller/url.controller");

const router = express.Router();

router
  .get("/urls", getUrl)
  .get("/:url", shortUrl)
  .post("/urls", createUrl);

module.exports.urlRoutes = router;
