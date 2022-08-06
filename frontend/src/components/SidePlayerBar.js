import React, { useEffect, useState } from "react";
import Stats from "./Stats";

// Icons
import { FaWeightHanging } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";

// Images
import logoman from "../assets/logoman.png";

// Custom Hooks
import { useFetchPlayerId } from "../hooks/useFetchPlayerId";
import { useFetchPlayerGeneralStats } from "../hooks/useFetchPlayerGeneralStats";

const SidePlayerBar = (props) => {
  let playerId = useFetchPlayerId([props.playerData], props.playerName);

  let {
    points,
    assists,
    rebounds,
    position,
    height,
    weight,
    teamId,
    teamName,
    jerseyNumber,
  } = useFetchPlayerGeneralStats([props.playerData], props.playerName);

  let successPlayerIdEle = (
    <>
      <div>
        <img
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = logoman;
          }}
        ></img>
      </div>

      <div className="mt-2 mb-6">
        <div>{`${teamName} | #${jerseyNumber} | ${position}`}</div>
        <div className="font-sidebar-player-name mt-1 text-3xl text-[#F88158]">
          {props.playerData[0]?.Data[0]?.player}
        </div>
      </div>

      <div className="flex flex-row w-full justify-around mb-6">
        <div className="text-xl">
          <div className="flex mb-4">
            <GiBodyHeight className="mr-2"></GiBodyHeight>
            <>{height}</>
          </div>
          <div className="flex">
            <FaWeightHanging className="mr-2"></FaWeightHanging>
            <>{`${weight} lbs`}</>
          </div>
        </div>

        <div className="h-full">
          <img
            src={`https://cdn.nba.com/logos/nba/${teamId}/global/D/logo.svg`}
            className="h-20"
          ></img>
        </div>
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
    <div className="order-first flex-shrink-0 w-96 mx-2 my-2 py-6 px-4 border-2 rounded-2xl flex flex-col items-center justify-between text-center">
      {playerId === "" ? nonSuccessPlayerIdEle : successPlayerIdEle}
    </div>
  );
};

export default SidePlayerBar;
