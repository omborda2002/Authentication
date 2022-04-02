const mongoose = require("mongoose");

const user_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", user_Schema);

module.exports = User;