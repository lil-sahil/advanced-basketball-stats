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

      <PlayerList players={players}></PlayerList>

      {response !== "Not valid" ? (
        <Chart playerData={playerData} statSelection={statSelection}></Chart>
      ) : (
        <BadRequest></BadRequest>
      )}

      {response !== "Not valid" ? (
        <SidePlayerBar
          playerName={playerName}
          playerData={playerData}
        ></SidePlayerBar>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
