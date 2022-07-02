const express = require("express");
const router = express.Router();
const { getPlayerData } = require("../controllers/playerController");

router.get("/:playerName", getPlayerData);

module.exports = router;
