import React, { useEffect } from "react";
import { useState } from "react";

const SidePlayerBar = (props) => {
  let [data, setData] = useState();
  let [playerId, setPlayerId] = useState();

  useEffect(() => {
    const getImageData = async () => {
      let latestYear = (await props.playerData.slice(-1)[0].Year) - 1;
      let response = await fetch(
        `http://data.nba.net/data/10s/prod/v1/${latestYear}/players.json`
      );

      setData(await response.json());
    };

    // Prevent from running if the platerData array is empty. i.e User did not specify a player
    if (props.playerData.length > 0) {
      getImageData();
    }
  }, [props.playerData]);

  useEffect(() => {
    getPlayerId(data);
  }, [data]);

  const getPlayerId = (data) => {
    if (data) {
      data.league.standard.map((player) => {
        let name = `${player.firstName} ${player.lastName}`.toLowerCase();
        if (name === props.playerName.toLowerCase()) {
          setPlayerId(player.personId);
        }
      });
    }
    console.log("I finished in getPlayerId");
  };

  return (
    <div>
      <div id="player-profile-picture">
        <img
          src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`}
        ></img>
      </div>

      <div id="player-name">{props.playerName}</div>
      <div id="player-born"></div>
    </div>
  );
};

export default SidePlayerBar;
