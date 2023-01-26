const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
  const { password, passwordConfirm, username, roles } = req.body;
  const exist = await User.findOne({ username });
  if (!exist) {
    if (password === passwordConfirm) {
      try {
        const encrypted = await bcrypt.hash(password, 10);
        const user = await new User({
          username,
          password: encrypted,
          roles,
        }).save();
        res.send(user);
      } catch (err) {
        res.send(err);
      }
    }
  } else {
    res.status(401).send("Username is already in");
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
    } else {
      res.status(401).send("Username or password is invalid");
    }
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = { loginUser, signupUser };
