// Component Import
import Title from "./components/Title";
import Chart from "./components/Chart";
import SearchFields from "./components/SearchFields";
import SidePlayerBar from "./components/SidePlayerBar";
import BadRequest from "./components/BadRequest";
import PlayerList from "./components/PlayerList";
import YearDataChart from "./components/YearDataChart";
import { BsGithub } from "react-icons/bs";

import { useState } from "react";
import SideBarLeaders from "./components/SideBarLeaders";

function App() {
  // States for search by player name
  let [playerName, setPlayerName] = useState("Michael Jordan");
  let [playerData, setPlayerData] = useState([]);
  let [players, setPlayers] = useState([]);

  // States for search by Year
  let [yearSelection, setYearSelection] = useState("All");
  let [yearData, setYearData] = useState([]);

  // States for both player and year search
  let [statSelection, setStatSelection] = useState();
  let [response, setResponse] = useState(undefined);
  let [searchOption, setSearchOption] = useState("Player");

  return (
    <div className="flex flex-col justify-start items-center h-screen box-border bg-main-background-dark text-white overflow-hidden">
      <div className="flex flex-row justify-between items-center border-b-2 w-5/6 h-20">
        <Title></Title>
        <BsGithub className="my-8 self-end text-2xl"></BsGithub>
      </div>

      <SearchFields
        setPlayerName={setPlayerName}
        setPlayerData={setPlayerData}
        playerName={playerName}
        setStatSelection={setStatSelection}
        statSelection={statSelection}
        setResponse={setResponse}
        setPlayers={setPlayers}
        players={players}
        setSearchOption={setSearchOption}
        searchOption={searchOption}
        setYearSelection={setYearSelection}
        yearSelection={yearSelection}
        setYearData={setYearData}
      ></SearchFields>

      {response === "good" ? (
        <></>
      ) : searchOption === "Player" ? (
        <PlayerList
          players={players}
          setPlayerName={setPlayerName}
          setPlayerData={setPlayerData}
          setResponse={setResponse}
          setPlayers={setPlayers}
        ></PlayerList>
      ) : (
        <></>
      )}

      <div className="flex w-screen items-center p-12">
        {response === "Not valid" || response === undefined ? (
          <BadRequest></BadRequest>
        ) : searchOption === "Player" ? (
          <Chart
            playerData={playerData}
            setPlayerData={setPlayerData}
            setResponse={setResponse}
            statSelection={statSelection}
            setPlayerName={setPlayerName}
            playerName={playerName}
          ></Chart>
        ) : (
          <YearDataChart
            yearSelection={yearSelection}
            statSelection={statSelection}
            data={yearData}
            setPlayerData={setPlayerData}
            setPlayerName={setPlayerName}
            setResponse={setResponse}
            setSearchOption={setSearchOption}
          ></YearDataChart>
        )}

        {response === "Not valid" || response === undefined ? (
          <></>
        ) : searchOption === "Player" ? (
          <SidePlayerBar
            playerName={playerName}
            playerData={playerData}
          ></SidePlayerBar>
        ) : (
          <SideBarLeaders
            yearData={yearData}
            statSelection={statSelection}
            yearSelection={yearSelection}
          ></SideBarLeaders>
        )}
      </div>
    </div>
  );
}

export default App;
