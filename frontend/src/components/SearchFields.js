import React from "react";
import { useEffect } from "react";
import StatListBox from "./headlessUIComponents/ListBox";

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

    if (uniqueNames(data).size === 1) {
      props.setPlayerData(data);
      props.setPlayerName(data[0].Data[0].player);
      props.setResponse("good");
      return 1;
    }

    // More than one player found
    else if (uniqueNames(data).size > 1) {
      let playerNamesFound = uniqueNames(data);

      // Set state with the list of player names found and have the user select who they are looking for.

      props.setPlayers(Array.from(playerNamesFound));

      return 1;
    }

    return 0;
  };

  const uniqueNames = (arr) => {
    return new Set(
      arr.map((item) => {
        return item.Data[0].player;
      })
    );
  };

  const clickHandler = async (e) => {
    props.setResponse(undefined);

    e.preventDefault();

    if (await fetchData(props.playerName)) {
      return 1;
    }

    // No names found
    else {
      // remove accent from name and search again
      let name = removeAccents(props.playerName);
      let firstName = name.split(" ")[0];

      if (await fetchData(firstName)) {
        return 1;
      } else {
        for (
          let letterIndex = firstName.length - 1;
          letterIndex > 0;
          letterIndex--
        ) {
          let name = firstName.slice(0, letterIndex);
          if (await fetchData(name)) {
            return 1;
          }
        }

        props.setResponse("Not valid");
      }
    }
  };

  // UseEffect hook will run on initial render to show the data for the mp_per_g
  useEffect(() => {
    props.setStatSelection("mp_per_g");
  }, []);

  return (
    <div>
      <form className="flex flex-row">
        <input
          type="text"
          name="playerName"
          onChange={(e) => changeHandler(e, props.setPlayerName)}
          placeholder="Player Name..."
          value={props.playerName}
          className="text-black mr-5"
        ></input>

        <StatListBox setStatSelection={props.setStatSelection}></StatListBox>
        <button type="submit" onClick={clickHandler} className="border px-1">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFields;
