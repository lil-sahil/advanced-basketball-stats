import React, { useEffect } from "react";
import { useState } from "react";

const SidePlayerBar = (props) => {
  let [data, setData] = useState();
  let [playerId, setPlayerId] = useState("");

  useEffect(() => {
    const getImageData = async () => {
      let latestYear = (await props.playerData.slice(-1)[0].Year) - 1;
      let response = await fetch(
        `http://data.nba.net/data/10s/prod/v1/${latestYear}/players.json`
      );
      let dataResponse = await response.json();
      setData(dataResponse);
      getPlayerId(dataResponse);
    };

    // Prevent from running if the platerData array is empty. i.e User did not specify a player
    if (props.playerData.length > 0) {
      getImageData();
    } else {
      setPlayerId("");
    }
  }, [props.playerData]);

  const getPlayerId = (data) => {
    let foundId = false;
    if (data) {
      data.league.standard.map((player) => {
        let name = `${player.firstName} ${player.lastName}`.toLowerCase();
        if (name === props.playerName.toLowerCase()) {
          foundId = true;
          setPlayerId(player.personId);
        }
      });
    }
  };

  let successPlayerIdEle = (
    <>
      <div id="player-profile-picture">
        <img
          src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`}
        ></img>
      </div>

      <div id="player-name">{props.playerData[0]?.Data[0]?.player}</div>
      <div id="player-born"></div>
    </>
  );

  let nonSuccessPlayerIdEle = <></>;

  return (
    <div>{playerId === "" ? nonSuccessPlayerIdEle : successPlayerIdEle}</div>
  );
};

export default SidePlayerBar;
