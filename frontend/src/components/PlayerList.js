import React from "react";

const PlayerList = (props) => {
  return (
    <>
      {props.players.map((playerName) => {
        return <div>{playerName}</div>;
      })}
      <div>PlayerList</div>
    </>
  );
};

export default PlayerList;
