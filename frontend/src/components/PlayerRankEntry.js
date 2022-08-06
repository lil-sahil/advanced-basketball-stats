import React from "react";

const PlayerRankEntry = (props) => {
  let { players } = props;

  let colorclassName = {
    1: "amber-200",
    2: "stone-300",
    3: "stone-500",
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Value</th>
          {props.yearSelection === "All" ? <th>Year</th> : null}
        </tr>

        {players.map((item, index) => {
          return (
            <tr className="border-b">
              <td>{index + 1}</td>
              <td>{item.player}</td>
              <td>{item[props.statSelection]}</td>
              {props.yearSelection === "All" ? <td>{item.year}</td> : null}
            </tr>
          );
        })}
      </table>

      {/* <div
        className={`${
          rank <= 3 ? `text-${color}` : "text-white"
        } border border-${color} rounded-full p-1 text-center w-8 leading-6`}
      >
        {rank}
      </div>
      <div>{player}</div>
      <div>{statValue}</div>
      <div>{year}</div> */}
    </div>
  );
};

export default PlayerRankEntry;
