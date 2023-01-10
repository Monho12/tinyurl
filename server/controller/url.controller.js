const { Url } = require("../model/url.model");

const getUrl = async (_req, res) => {
  try {
    const result = await Url.find({});
    res.send(result);
  } catch (err) {}
};

const createUrl = async (req, res) => {
  const body = req.body;
  try {
    const result = await new Url(body).save();
    res.send(result);
  } catch (error) {}
};

const shortUrl = async (req, res) => {
  const short = req.params.url;
  const url = await Url.findOne({ short });
  if (url == null) {
    res.status(404);
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

module.exports = { getUrl, createUrl, shortUrl , deleteUrl };
