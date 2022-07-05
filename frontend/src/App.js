// Component Import
import Chart from "./components/Chart";
import SearchFields from "./components/SearchFields";
import { useState } from "react";

function App() {
  let [playerName, setPlayerName] = useState();
  let [playerData, setPlayerData] = useState([]);

  const changeHandler = (e) => {
    setPlayerName(e.target.value);
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    let response = await fetch(`http://localhost:5000/api/${playerName}`, {
      mode: "cors",
    });
    let data = await response.json();

    setPlayerData(data);
  };

  return (
    <div>
      <SearchFields
        changeHandler={changeHandler}
        clickHandler={clickHandler}
      ></SearchFields>
      <Chart playerData={playerData}></Chart>
    </div>
  );
}

export default App;
