const mongoose = require("mongoose");

const yearlySchema = mongoose.Schema({
  player: String,
  pos: String,
  age: String,
  team_id: String,
  g: String,
  gs: String,
  mp_per_g: String,
  fg_per_g: String,
  fga_per_g: String,
  fg_pct: String,
  fg3_per_g: String,
  fg3a_per_g: String,
  fg3_pct: String,
  fg2_per_g: String,
  fg2a_per_g: String,
  fg2_pct: String,
  efg_pct: String,
  ft_per_g: String,
  fta_per_g: String,
  ft_pct: String,
  orb_per_g: String,
  drb_per_g: String,
  trb_per_g: String,
  ast_per_g: String,
  stl_per_g: String,
  blk_per_g: String,
  tov_per_g: String,
  pf_per_g: String,
  pts_per_g: String,
  mp: String,
  per: String,
  ts_pct: String,
  fg3a_per_fga_pct: String,
  fta_per_fga_pct: String,
  orb_pct: String,
  drb_pct: String,
  trb_pct: String,
  ast_pct: String,
  stl_pct: String,
  blk_pct: String,
  tov_pct: String,
  usg_pct: String,
  DUMMY: String,
  ows: String,
  dws: String,
  ws: String,
  ws_per_48: String,
  obpm: String,
  dbpm: String,
  bpm: String,
  vorp: String,
});

const myDB = mongoose.connection.useDb("stats");

const yearlyModel = (year) => {
  return myDB.model(year, yearlySchema, year);
};

module.exports = yearlyModel;
