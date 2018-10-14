const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  err => {
    console.log("connected to Mongo");
  }
);
