const express = require("express");
const router = express.Router();
const { getYearlyData } = require("../controllers/yearlyController");

router.get("/:year/:stat", getYearlyData);

module.exports = router;
