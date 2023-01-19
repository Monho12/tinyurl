const { Url } = require("../model/url.model");

const getUrl = async (_req, res) => {
  try {
    const result = await Url.find({});
    res.send(result);
  } catch (err) {
    res.send(err);
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

module.exports = { getUrl, createUrl, shortUrl };
