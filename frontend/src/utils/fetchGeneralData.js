import { getPlayerSlug } from "./getPlayerSlug";

export const fetchGeneralData = async (playerName) => {
  let playerSlug = getPlayerSlug(playerName);

  let response = await fetch(`http://localhost:5000/api/general/${playerSlug}`);
  let dataResponse = await response.json();

  return dataResponse.Data.length === 0 ? "fail" : dataResponse.Data[0];
};
