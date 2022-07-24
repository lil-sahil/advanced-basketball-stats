import React from "react";

const Stats = (props) => {
  return (
    <div className="flex-col justify-center items-center px-4 py-2 border-solid border-2 border-gray-300 rounded">
      <div className="font-sidebar-stats text-center text-3xl mb-2">
        {props.stat}
      </div>
      <div className="text-center">{props.statName}</div>
    </div>
  );
};

export default Stats;
