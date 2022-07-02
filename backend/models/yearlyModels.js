const mongoose = require("mongoose");

const yearlySchema = mongoose.Schema({});

const yearlyModel = (year) => {
  return mongoose.model("yearlyData", yearlySchema, year);
};
module.exports = yearlyModel;
