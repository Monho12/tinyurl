const express = require("express");
const {
  createUrl,
  getUrl,
  shortUrl,
  deleteUrl,
} = require("../controller/url.controller");

const router = express.Router();

router
  .get("/urls", getUrl)
  .get("/:url", shortUrl)
  .post("/urls", createUrl)
  .delete("/urls/:id", deleteUrl);

module.exports.urlRoutes = router;
