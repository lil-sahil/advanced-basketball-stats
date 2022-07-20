import { useEffect, useState } from "react";

export const useFetchPlayerId = (dependency, playerName) => {
  let [playerId, setPlayerId] = useState("");

  const getPlayerId = (data) => {
    setPlayerId("");

    setPlayerId(data.Data[0]["PERSON_ID"].toString());
  };

  const getPlayerSlug = (playerName) => {
    let playerFirstName = playerName.split(" ")[0];
    let playerLastName = playerName.split(" ")[1];

    let playerSlug = `${playerFirstName}-${playerLastName}`;
    return playerSlug;
  };

  useEffect(() => {
    const getImageData = async () => {
      let playerSlug = getPlayerSlug(playerName);
      let response = await fetch(
        `http://localhost:5000/api/general/${playerSlug}`
      );
      let dataResponse = await response.json();

      getPlayerId(dataResponse);
    };

    getImageData();
  }, dependency);

  return playerId;
};
