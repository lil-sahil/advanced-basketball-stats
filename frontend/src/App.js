// Component Import
import Chart from "./components/Chart";
import SearchFields from "./components/SearchFields";
import { useState } from "react";

function App() {
  let [playerName, setPlayerName] = useState();
  let [playerData, setPlayerData] = useState([]);
  let [statSelection, setStatSelection] = useState();

  return (
    <div>
      <SearchFields
        setPlayerName={setPlayerName}
        setPlayerData={setPlayerData}
        playerName={playerName}
        setStatSelection={setStatSelection}
      ></SearchFields>
      <Chart playerData={playerData} statSelection={statSelection}></Chart>
    </div>
  );
}

export default App;
