const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const limit = req.query.limit || 4;
    const skip = req.query.skip || 0;
    const offset = req.query.offset || 4;
    const result = await User.find(
      {},
      {
        password: 0,
      }
    )
      .skip(skip * offset)
      .limit(limit);
    User.count({}, function (err, count) {
      const counter = Math.ceil(count / offset);
      res.send({ result, count: counter });
    });
  } catch (err) {
    res.send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {}
};

const Verify = async (req, res) => {
  try {
    await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      (error, item) => {
        if (!error) {
          res.send(item);
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getUsers, getUser, Verify, deleteUser };
