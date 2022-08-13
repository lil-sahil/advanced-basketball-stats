import React from "react";

const PlayerList = (props) => {
  const handleClick = (e) => {
    props.setPlayerName(e.target.innerHTML);
    fetchData(e.target.innerHTML);
  };

  const fetchData = async (searchString) => {
    let response = await fetch(`http://localhost:5000/api/${searchString}`, {
      mode: "cors",
    });
    let data = await response.json();

    props.setPlayerData(data);
    props.setResponse("good");
    props.setPlayers([]);
    return 1;
  };

  return (
    <div className="flex flex-row max-w-xl flex-wrap mt-10">
      {props.players.map((playerName) => {
        return (
          <div
            onClick={handleClick}
            className="border-2 rounded border-main-gold bg-main-basketball-orange hover:bg-main-gold hover:border-main-basketball-orange hover:cursor-pointer p-2 mr-2 mb-2 "
          >
            {playerName}
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;
