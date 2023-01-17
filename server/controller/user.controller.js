const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
  const body = req.body;
  const { password, passwordConfirm, username } = req.body;
  const exist = await User.findOne({ username });
  if (!exist) {
    if (password === passwordConfirm) {
      try {
        const user = await new User(body).save();

        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "30seconds",
        });
        res.send(token);
      } catch (err) {
        console.log(err);
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
    const result = await User.find({});
    res.send(result);
  } catch (err) {}
};

const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.send(result);
  } catch (err) {}
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username, password: password });

  console.log(user);

  try {
    if (user.password === password && user.username === username) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "10min",
      });
      res.send(token);
    }
  } catch (error) {
    res.status(401).send("Username or password is invalid");
  }
};

const Verify = (req, res) => {
  jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET,
    (error, item) => {
      if (error) {
        return res.sendStatus(401);
      }
      res.send(item);
    }
  );
};

module.exports = { createUser, loginUser, getUsers, getUser, Verify };
