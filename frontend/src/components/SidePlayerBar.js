import React, { useEffect, useState } from "react";

// Custom Hooks
import { useFetchPlayerId } from "../hooks/useFetchPlayerId";
import { useFetchPlayerGeneralStats } from "../hooks/useFetchPlayerGeneralStats";

const SidePlayerBar = (props) => {
  let playerId = useFetchPlayerId([props.playerData], props.playerName);

  let { points, assists, rebounds, position, height, weight } =
    useFetchPlayerGeneralStats([props.playerData], props.playerName);

  let successPlayerIdEle = (
    <>
      <div id="player-profile-picture">
        <img
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`}
        ></img>
      </div>

      <div id="player-name">{props.playerData[0]?.Data[0]?.player}</div>
      <div id="player-pts">Points: {points}</div>
      <div id="player-assist">Assists: {assists}</div>
      <div id="player-rebounds">Rebounds: {rebounds}</div>
    </>
  );

  let nonSuccessPlayerIdEle = <></>;

  return (
    <div className="order-first flex-shrink-0 w-96 mx-2 my-2 border-2">
      {playerId === "" ? nonSuccessPlayerIdEle : successPlayerIdEle}
    </div>
  );
};

export default SidePlayerBar;
