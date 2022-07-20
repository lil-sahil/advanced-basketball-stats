const getPlayerSlug = (playerName) => {
  let playerFirstName = playerName.split(" ")[0];
  let playerLastName = playerName.split(" ")[1];

  let playerSlug = `${playerFirstName}-${playerLastName}`;
  return playerSlug;
};

export const getPlayerId = async (playerName) => {
  let playerSlug = getPlayerSlug(playerName);

  let response = await fetch(`http://localhost:5000/api/general/${playerSlug}`);
  let dataResponse = await response.json();

  return dataResponse.Data.length === 0
    ? 0
    : dataResponse.Data[0]["PERSON_ID"].toString();
};
