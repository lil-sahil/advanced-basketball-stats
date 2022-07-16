import React, { useEffect } from "react";

// Custom Hooks
import { useFetchPlayerId } from "../hooks/useFetchPlayerId";

const SidePlayerBar = (props) => {
  let playerId = useFetchPlayerId(props.playerData, props.playerName);

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
