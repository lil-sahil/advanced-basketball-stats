// Component Import
import Title from "./components/Title";
import Chart from "./components/Chart";
import SearchFields from "./components/SearchFields";
import SidePlayerBar from "./components/SidePlayerBar";
import BadRequest from "./components/BadRequest";
import PlayerList from "./components/PlayerList";

import { useState } from "react";

function App() {
  let [playerName, setPlayerName] = useState();
  let [playerData, setPlayerData] = useState([]);
  let [statSelection, setStatSelection] = useState();
  let [response, setResponse] = useState(undefined);
  let [players, setPlayers] = useState([]);
  let [searchOption, setSearchOption] = useState("Player");

  return (
    <div className="flex flex-col justify-center items-center h-screen box-border bg-main-background text-white">
      <Title></Title>

      <SearchFields
        setPlayerName={setPlayerName}
        setPlayerData={setPlayerData}
        playerName={playerName}
        setStatSelection={setStatSelection}
        statSelection={statSelection}
        setResponse={setResponse}
        setPlayers={setPlayers}
        setSearchOption={setSearchOption}
        searchOption={searchOption}
      ></SearchFields>

      {response === "good" ? (
        <></>
      ) : (
        <PlayerList
          players={players}
          setPlayerName={setPlayerName}
          setPlayerData={setPlayerData}
          setResponse={setResponse}
        ></PlayerList>
      )}

      <div className="flex w-screen ">
        {response === "Not valid" || response === undefined ? (
          <BadRequest></BadRequest>
        ) : (
          <Chart playerData={playerData} statSelection={statSelection}></Chart>
        )}

        {response === "Not valid" || response === undefined ? (
          <></>
        ) : (
          <SidePlayerBar
            playerName={playerName}
            playerData={playerData}
          ></SidePlayerBar>
        )}
      </div>
    </div>
  );
}

export default App;
