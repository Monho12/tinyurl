const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { password, passwordConfirm, username } = req.body;
  const exist = await User.findOne({ username });
  if (!exist) {
    if (password === passwordConfirm) {
      try {
        const encrypted = await bcrypt.hash(password, 1);
        const user = await new User({ username, password: encrypted }).save();
        res.send(user);
      } catch (err) {
        res.send(err);
      }
    } else {
      console.log("Password doesn't match");
    }
  } else {
    res.status(401).send("Username is already in");
  }
};

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

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  console.log(user);

  try {
    const isEqaul = await bcrypt.compare(password, user.password);
    if (isEqaul) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "30min",
      });
      res.send(token);
    }
  } catch (error) {
    res.status(401).send("Username or password is invalid");
  }
};

const Verify = (req, res) => {
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

module.exports = { createUser, loginUser, getUsers, getUser, Verify };
