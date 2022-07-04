// Component Import
import Chart from "./components/Chart";
import SearchFields from "./components/SearchFields";
import { useState, useEffect } from "react";

function App() {
  let [playerName, setPlayerName] = useState();

  const changeHandler = (e) => {
    setPlayerName(e.target.value);
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    let response = await fetch(`http://localhost:5000/api/${playerName}`, {
      mode: "cors",
    });
    let data = await response.json();

    console.log(data);
  };

  return (
    <div>
      <SearchFields
        changeHandler={changeHandler}
        clickHandler={clickHandler}
      ></SearchFields>
      <Chart></Chart>
    </div>
  );
}

export default App;
