import React from "react";
import { useEffect } from "react";

// Utils
import { removeAccents } from "../utils/stringCleanup";

// Configuration files
import { stats } from "../config/statConfig";

const SearchFields = (props) => {
  // State to determine if the user sent a bad request.

  const changeHandler = (e, stateToUpdate) => {
    let val = removeAccents(e.target.value);
    stateToUpdate(val);
  };

  const fetchData = async (searchString) => {
    let response = await fetch(`http://localhost:5000/api/${searchString}`, {
      mode: "cors",
    });
    let data = await response.json();

    return data;
  };

  const uniqueNames = (arr) => {
    return new Set(
      arr.map((item) => {
        return item.Data[0].player;
      })
    ).size;
  };

  const clickHandler = async (e) => {
    props.setResponse(undefined);

    e.preventDefault();

    let data = await fetchData(props.playerName);

    // let response = await fetch(
    //   `http://localhost:5000/api/${props.playerName}`,
    //   {
    //     mode: "cors",
    //   }
    // );
    // let data = await response.json();

    if (uniqueNames(data) === 1) {
      props.setPlayerData(data);
    } else {
      let data = fetchData(props.playerName.split(" ")[0]);
      let playerNamesFound = data.map((item) => {
        return item.Data[0].player;
      });

      console.log(playerNamesFound);
    }

    // if (data.length === 0) {
    //   props.setResponse("Not valid");

    //   // Search by first name only and suggest players
    //   let data = fetchData(props.playerName.split(" ")[0]);
    //   let playerNamesFound = data.map((item) => {
    //     return item.Data[0].player;
    //   });

    //   console.log(playerNamesFound);
    // }
  };

  // Useeffect hook will run on initial render to show the data for the mp_per_g
  useEffect(() => {
    props.setStatSelection("mp_per_g");
  }, []);

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
