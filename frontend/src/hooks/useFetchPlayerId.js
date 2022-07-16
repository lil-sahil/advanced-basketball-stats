import { useEffect, useState } from "react";

export const useFetchPlayerId = (playerData, playerName) => {
  let [playerId, setPlayerId] = useState("");

  const getPlayerId = (data) => {
    setPlayerId("");
    if (data) {
      data.league.standard.map((player) => {
        let name = `${player.firstName} ${player.lastName}`.toLowerCase();
        if (name === playerName.toLowerCase()) {
          setPlayerId(player.personId);
        }
      });
    }
  };

  useEffect(() => {
    const getImageData = async () => {
      let latestYear = playerData.slice(-1)[0].Year - 1;
      let response = await fetch(
        `http://data.nba.net/data/10s/prod/v1/${latestYear}/players.json`
      );
      let dataResponse = await response.json();

      getPlayerId(dataResponse);
    };

    getImageData();
  }, [playerData]);

  return playerId;
};
