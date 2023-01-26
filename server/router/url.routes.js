const express = require("express");
const { createUrl, getUrl, shortUrl } = require("../controller/url.controller");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

const router = express.Router();

router
  .get("/urls", roleMiddleware, getUrl)
  .get("/:url", shortUrl)
  .post("/urls", createUrl);

module.exports.urlRoutes = router;
