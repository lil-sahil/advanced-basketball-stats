const yearlyModel = require("../models/yearlyModels");

// Utils
const { removeAccents } = require("../utils/stringManipulation");

// @desc    GET Player Data
// @route   GET /api/:playerData
// @access  Public

const getPlayerData = async (req, res) => {
  let playerData = [];

  // If the user enters a name with an accent the remove accent function will sanitize it.

  for (let year = 1980; year <= 2022; year++) {
    let results = {
      Year: year,
      Data: await yearlyModel(year.toString())
        .find({
          player: { $regex: req.params.playerName, $options: "i" },
        })
        .collation({ locale: "en", strength: 1 }),
    };

    Object.keys(results.Data).length > 0 ? playerData.push(results) : 1;
  }

  if (playerData.length === 0) {
    res.status(400).json([]);
  } else {
    res.status(200).json(playerData);
  }
};

module.exports = {
  getPlayerData,
};
