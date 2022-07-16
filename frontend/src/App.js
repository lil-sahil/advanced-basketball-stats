// Component Import
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

  return (
    <div>
      <SearchFields
        setPlayerName={setPlayerName}
        setPlayerData={setPlayerData}
        playerName={playerName}
        setStatSelection={setStatSelection}
        statSelection={statSelection}
        setResponse={setResponse}
        setPlayers={setPlayers}
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
  );
}

export default App;
