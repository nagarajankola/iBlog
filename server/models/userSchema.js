const mongoose = require( "mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profilePicture:{
      type: String,
  },
}, {collection: "users"});

const User = mongoose.model("USER", userSchema);

module.exports = User;