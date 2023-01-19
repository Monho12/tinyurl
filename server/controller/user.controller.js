const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (_req, res) => {
  try {
    const result = await User.find(
      {},
      {
        password: 0,
      }
    );
    res.send(result);
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

const Verify = async (req, res) => {
  try {
    jwt.verify(
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

module.exports = { getUsers, getUser, Verify };
