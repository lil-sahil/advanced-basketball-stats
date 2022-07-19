const mongoose = require("mongoose");

const generalSchema = mongoose.Schema(
  {
    PERSON_ID: Number,
    PLAYER_LAST_NAME: String,
    PLAYER_FIRST_NAME: String,
    PLAYER_SLUG: String,
    TEAM_ID: Number,
    TEAM_SLUG: String,
    IS_DEFUNCT: Number,
    TEAM_CITY: String,
    TEAM_NAME: String,
    TEAM_ABBREVIATION: String,
    JERSEY_NUMBER: String,
    POSITION: String,
    HEIGHT: String,
    WEIGHT: String,
    COLLEGE: String,
    COUNTRY: String,
    DRAFT_YEAR: Number,
    DRAFT_ROUND: Number,
    DRAFT_NUMBER: Number,
    ROSTER_STATUS: Number,
    PTS: Number,
    REB: Number,
    AST: Number,
    STATS_TIMEFRAME: String,
    FROM_YEAR: String,
    TO_YEAR: String,
  },
  { collection: "player-data" }
);

const myDB = mongoose.connection.useDb("player-general-stats");

module.exports = myDB.model("player-data", generalSchema, "player-data");
