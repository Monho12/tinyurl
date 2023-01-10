const { Schema, model } = require("mongoose");
const shortId = require("shortid");

const urlSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  Creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "tinyUser",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Url = model("tinyUrl", urlSchema);

module.exports.Url = Url;
