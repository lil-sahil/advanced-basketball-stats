import { removeAccents } from "./stringCleanup";

export const getPlayerSlug = (playerName) => {
  let playerFirstName = removeAccents(playerName.split(" ")[0]);
  let playerLastName = removeAccents(playerName.split(" ")[1]);

  let playerSlug = `${playerFirstName}-${playerLastName}`;
  return playerSlug;
};
