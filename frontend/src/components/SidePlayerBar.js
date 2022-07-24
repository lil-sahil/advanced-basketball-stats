import React, { useEffect, useState } from "react";
import Stats from "./Stats";

// Custom Hooks
import { useFetchPlayerId } from "../hooks/useFetchPlayerId";
import { useFetchPlayerGeneralStats } from "../hooks/useFetchPlayerGeneralStats";

const SidePlayerBar = (props) => {
  let playerId = useFetchPlayerId([props.playerData], props.playerName);

  let { points, assists, rebounds, position, height, weight } =
    useFetchPlayerGeneralStats([props.playerData], props.playerName);

  let successPlayerIdEle = (
    <>
      <div>
        <img
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`}
        ></img>
      </div>

      <div className="font-sidebar-player-name mt-5">
        {props.playerData[0]?.Data[0]?.player}
      </div>

      <div className="flex items-center justify-between w-full px-5 mt-5">
        <Stats statName="PPG" stat={points}></Stats>
        <Stats statName="APG" stat={assists}></Stats>
        <Stats statName="RPG" stat={rebounds}></Stats>
      </div>
    </>
  );

  let nonSuccessPlayerIdEle = <></>;

  return (
    <div className="order-first flex-shrink-0 w-96 mx-2 my-2 py-6 px-4 border-2 flex flex-col items-center justify-between">
      {playerId === "" ? nonSuccessPlayerIdEle : successPlayerIdEle}
    </div>
  );
};

export default SidePlayerBar;
