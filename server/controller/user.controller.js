const { User } = require("../model/user.model");

const createUser = async (req, res) => {
  const body = req.body;
  const { password, passwordConfirm, username } = req.body;
  const exist = await User.findOne({ username });
  if (!exist) {
    if (password === passwordConfirm) {
      try {
        const user = await new User(body).save();
        res.send(user);
        console.log(user);
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
      res.send(user);
    }
  } catch (error) {
    res.status(401).send("Username or password is invalid");
  }
};

module.exports = { createUser, loginUser, getUsers, getUser };
