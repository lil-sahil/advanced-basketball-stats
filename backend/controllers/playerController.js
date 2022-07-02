const yearlyModel = require("../models/yearlyModels");

// @desc    GET Player Data
// @route   GET /api/:playerData
// @access  Public

const getPlayerData = async (req, res) => {
  let playerData = [];
  for (let year = 1980; year <= 2022; year++) {
    let results = {
      Year: year,
      Data: await yearlyModel(year.toString()).find({
        player: { $regex: req.params.playerName, $options: "i" },
      }),
    };

    Object.keys(results.Data).length > 0 ? playerData.push(results) : 1;
  }

  res.status(200).json(playerData);
};

module.exports = {
  getPlayerData,
};
