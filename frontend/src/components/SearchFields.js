import React from "react";

// Configuration files
import { stats } from "../config/statConfig";

const SearchFields = (props) => {
  const changeHandler = (e, stateToUpdate) => {
    stateToUpdate(e.target.value);
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `http://localhost:5000/api/${props.playerName}`,
      {
        mode: "cors",
      }
    );
    let data = await response.json();

    props.setPlayerData(data);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="playerName"
          onChange={(e) => changeHandler(e, props.setPlayerName)}
          placeholder="Player Name..."
        ></input>
        <label htmlFor="stats">Choose a stat:</label>
        <select
          id="stats"
          name="stats"
          onChange={(e) => changeHandler(e, props.setStatSelection)}
        >
          {stats.map((stat, index) => {
            return index === 1 ? (
              <option value={stat} defaultValue>
                {stat}
              </option>
            ) : (
              <option value={stat}>{stat}</option>
            );
          })}
        </select>
        <button type="submit" onClick={clickHandler}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFields;
