const mongoose = require("mongoose");

const DB = process.env.MONGODB_URI;
const DBconfig = process.env.DATABASE;

mongoose
  .connect(DB || DBconfig, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection ");
  })
  .catch((err) => console.log(err));
