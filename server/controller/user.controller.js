const { User } = require("../model/user.model");
// const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const body = req.body;
  const { password, passwordConfirm } = req.body;
  if (password === passwordConfirm) {
    try {
      const user = await new User(body).save();
      res.send(user);
      console.log(user);
    } catch (err) {}
  } else {
    console.log("Password doesn't match");
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
  const user = await User.findOne({ username });

  console.log(user);

  try {
    if (user.password === password) {
      res.send(user);
    } else {
      console.log("Username or password is invalid");
    }
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRES_IN,
    // });
    // res.send({ token });
  } catch (error) {
    res.status(401).send({ message: "Username or password is invalid" });
  }
};

module.exports = { createUser, loginUser, getUsers, getUser };
