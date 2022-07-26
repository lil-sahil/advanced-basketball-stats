import { useEffect, useState } from "react";

import { fetchGeneralData } from "../utils/fetchGeneralData";

export const useFetchPlayerGeneralStats = (dependency, playerName) => {
  let [points, setPoints] = useState("");
  let [assists, setAssists] = useState("");
  let [rebounds, setRebounds] = useState("");
  let [position, setPosition] = useState("");
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [teamId, setTeamId] = useState("");
  let [teamName, setTeamName] = useState("");
  let [jerseyNumber, setJerseyNumber] = useState("");

  useEffect(() => {
    const getStats = async () => {
      let response = await fetchGeneralData(playerName);

      setPoints(response["PTS"]);
      setAssists(response["AST"]);
      setRebounds(response["REB"]);
      setPosition(response["POSITION"]);
      setHeight(response["HEIGHT"]);
      setWeight(response["WEIGHT"]);
      setTeamId(response["TEAM_ID"]);
      setTeamName(response["TEAM_NAME"]);
      setJerseyNumber(response["JERSEY_NUMBER"]);
    };

    getStats();
  }, dependency);

  return {
    points,
    assists,
    rebounds,
    position,
    height,
    weight,
    teamId,
    teamName,
    jerseyNumber,
  };
};
