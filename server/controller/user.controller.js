const { User } = require("../model/user.model");

const createUser = async (req, res) => {
  const body = req.body;
  try {
    const user = await new User(body).save();
    res.send(user);
  } catch (err) {}
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
      console.log("error");
    }
  } catch (error) {
    res.status(401).json({ message: "Username or password is invalid" });
  }
};

module.exports = { createUser, loginUser, getUsers, getUser };
