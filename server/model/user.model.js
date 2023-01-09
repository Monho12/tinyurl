const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const User = model("tinyUser", userSchema);

module.exports.User = User;
