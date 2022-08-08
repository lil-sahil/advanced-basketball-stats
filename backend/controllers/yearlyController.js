const yearlyModel = require("../models/yearlyModels");

// @desc    GET Yearly Data
// @route   GET /api/yearly_data
// @access  Public

const getYearlyData = async (req, res) => {
  const stat = req.params.stat;
  const yearlyData = await yearlyModel(req.params.year).find(
    {
      $and: [
        { $expr: { $gt: [{ $toDouble: "$g" }, 30] } },
        { $expr: { $gt: [{ $toDouble: "$mp_per_g" }, 30] } },
      ],
    },
    {
      _id: 0,
    }
  );

  res.status(200).json(yearlyData);
};

module.exports = {
  getYearlyData,
};
