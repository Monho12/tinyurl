const { Url } = require("../model/url.model");
const jwt = require("jsonwebtoken");

const getUrl = async (req, res) => {
  try {
    const token = req.headers.authorization ?? null;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const result = await Url.find({ Creator: payload.user._id });
    res.send(result);
  } catch (err) {
    res.sendStatus(404);
  }
};

const getLink = async (req, res) => {
  try {
    const limit = req.query.limit || 3;
    const skip = req.query.skip || 0;
    const offset = req.query.offset || 3;
    const result = await Url.find({})
      .skip(skip * offset)
      .limit(limit);
    Url.count({}, function (err, count) {
      const counter = Math.ceil(count / offset);
      res.send({ result, count: counter });
    });
  } catch (err) {
    res.sendStatus(404);
  }
};

const createUrl = async (req, res) => {
  const body = req.body;
  try {
    const result = await new Url(body).save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const shortUrl = async (req, res) => {
  const short = req.params.url;
  const url = await Url.findOne({ short });

  if (url == null) {
    res.status(404).send("Url not found");
  } else {
    res.redirect(url.full);
    url.save();
  }
};

const deleteUrl = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Url.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {}
};

module.exports = { getUrl, createUrl, shortUrl, getLink, deleteUrl };
