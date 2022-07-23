import { useEffect, useState } from "react";

import { fetchGeneralData } from "../utils/fetchGeneralData";

export const useFetchPlayerGeneralStats = (dependency, playerName) => {
  let [points, setPoints] = useState("");
  let [assists, setAssists] = useState("");
  let [rebounds, setRebounds] = useState("");
  let [position, setPosition] = useState("");
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");

  useEffect(() => {
    const getStats = async () => {
      let response = await fetchGeneralData(playerName);

      setPoints(response["PTS"]);
      setAssists(response["AST"]);
      setRebounds(response["REB"]);
      setPosition(response["POSITION"]);
      setHeight(response["HEIGHT"]);
      setWeight(response["WEIGHT"]);
    };

    getStats();
  }, dependency);

  return { points, assists, rebounds, position, height, weight };
};
