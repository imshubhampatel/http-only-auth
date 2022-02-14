const mongoose = require("mongoose");
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (err) {
  if (err) console.log("err in connecting to database");
  console.log("Successfully connected");
});
