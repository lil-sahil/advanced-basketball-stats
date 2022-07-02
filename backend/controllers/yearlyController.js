const yearlyModel = require("../models/yearlyModels");

// @desc    GET Yearly Data
// @route   GET /api/yearly_data
// @access  Public

const getYearlyData = async (req, res) => {
  const yearlyData = await yearlyModel(req.params.year).find();

  res.status(200).json(yearlyData);
};

module.exports = {
  getYearlyData,
};
