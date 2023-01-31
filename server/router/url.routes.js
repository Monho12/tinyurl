const express = require("express");
const {
  createUrl,
  getUrl,
  shortUrl,
  getLink,
  deleteUrl,
} = require("../controller/url.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

const router = express.Router();

router
  .get("/urls", authMiddleware, getUrl)
  .get("/links", roleMiddleware, getLink)
  .get("/:url", shortUrl)
  .post("/urls", authMiddleware, createUrl)
  .delete("/url/:id", authMiddleware, deleteUrl);

module.exports.urlRoutes = router;
