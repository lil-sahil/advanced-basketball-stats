import React from "react";

const SearchFields = (props) => {
  return (
    <div>
      <form>
        <input
          type="text"
          name="playerName"
          onChange={props.changeHandler}
        ></input>
        <button type="submit" onClick={props.clickHandler}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFields;
