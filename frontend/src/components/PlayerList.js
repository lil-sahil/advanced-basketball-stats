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
    <>
      {props.players.map((playerName) => {
        return <div onClick={handleClick}>{playerName}</div>;
      })}
    </>
  );
};

export default PlayerList;
