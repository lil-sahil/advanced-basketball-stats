const express = require("express");
const router = express.Router();
const { getPlayerData } = require("../controllers/playerController");
const { getGeneralPlayerData } = require("../controllers/playerController");

router.get("/:playerName", getPlayerData);

router.get("/general/:playerName", getGeneralPlayerData);

module.exports = router;
