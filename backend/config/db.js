const mongoose = require("mongoose");

const makeConnectionToDb = () => {
  mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("connected");
  });
};

module.exports = makeConnectionToDb;
