const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', user);

module.exports = User;
