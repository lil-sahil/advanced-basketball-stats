import React from "react";
import { useEffect } from "react";
import ListBox from "./headlessUIComponents/ListBox";
import ToggleSwitch from "./headlessUIComponents/ToggleSwitch";

// Utils
import { removeAccents } from "../utils/stringCleanup";
import { statVerbiage } from "../utils/convertStatsVerbiage";
import { removeDoublePlayerEntries } from "../utils/statCalcs";

// Configuration files
import { stats } from "../config/statConfig";
import { years } from "../config/yearConfig";

const SearchFields = (props) => {
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

  const fetchYearlyData = async (year) => {
    let response = await fetch(
      `http://localhost:5000/api/yearly_data/${year}/${props.statSelection}`,
      {
        mode: "cors",
      }
    );
    let data = await response.json();
    data = removeDoublePlayerEntries(data, props.statSelection);
    props.setResponse("good");

    return data;
  };

  const clickHandlerYear = async (e) => {
    props.setResponse(undefined);
    props.setYearData([]);
    e.preventDefault();
    let yearsToFetch = [];
    let yearlyData = [];

    if (props.yearSelection === "All") {
      yearsToFetch = years.filter((item) => item !== "All");

      for (let year of yearsToFetch) {
        let response = await fetchYearlyData(year);
        yearlyData.push(response);
      }

      props.setYearData(yearlyData);
    } else {
      let response = await fetchYearlyData(props.yearSelection);
      props.setYearData(response);
    }

    return 1;
  };

  // UseEffect hook will run on initial render to show the data for the mp_per_g
  useEffect(() => {
    props.setStatSelection("mp_per_g");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="flex flex-row justify-between items-center bg-secondary-background-light-dark p-4 mt-12 rounded-lg">
        {props.searchOption === "Player" ? (
          <div className="flex flex-col mr-10">
            <div className="mb-2">Player Name:</div>
            <input
              type="text"
              name="playerName"
              onChange={(e) => changeHandler(e, props.setPlayerName)}
              placeholder="Player Name..."
              value={props.playerName}
              className={`text-black text-sm rounded-lg inline-block h-9 w-[288px] ${
                props.players.length > 1 ? "border-4 border-red-200" : ""
              }`}
            ></input>
          </div>
        ) : (
          <div className="flex flex-col mr-10">
            <div className="mb-2">Year:</div>
            <ListBox
              data={years}
              setData={props.setYearSelection}
              setResponse={props.setResponse}
              clear={true}
            ></ListBox>
          </div>
        )}

        <div className="flex flex-col mr-10">
          <div className="mb-2">Stat:</div>

          <ListBox
            setData={props.setStatSelection}
            callBackFunc={statVerbiage}
            data={stats}
            clear={false}
          ></ListBox>
        </div>

        <div className="flex flex-col items-center h-full mr-10">
          <div>
            <div className="px-10">Search By:</div>

            <div className="flex flex-row justify-between">
              <div
                className={`${
                  props.searchOption === "Year" ? "text-[#2980B9]" : null
                }`}
              >
                Year
              </div>
              <div
                className={`${
                  props.searchOption === "Player" ? "text-[#2980B9]" : null
                }`}
              >
                Player
              </div>
            </div>
          </div>
          <ToggleSwitch
            setSearchOption={props.setSearchOption}
            searchOption={props.searchOption}
          ></ToggleSwitch>
        </div>

        <button
          type="submit"
          onClick={
            props.searchOption === "Player" ? clickHandler : clickHandlerYear
          }
          className="border px-4 py-2 bg-[#2980B9] rounded-md w-min"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFields;
