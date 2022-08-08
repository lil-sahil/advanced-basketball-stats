const fetchYearlyData = async (year, stat) => {
  let response = await fetch(
    `http://localhost:5000/api/yearly_data/${year}/${stat}`
  );
  return response.json();
};

const removeNanVals = (array, stat) => {
  array = array.filter((item) => {
    if (!isNaN(item[stat])) {
      return item;
    }
  });

  return array;
};

const removeDoublePlayerEntries = (array) => {
  let playersTotalYearlyStats = array.filter((obj) => {
    return obj["team_id"] === "TOT";
  });

  let players = playersTotalYearlyStats.map((obj) => obj["player"]);

  let removedArray = array.filter((obj) => {
    if (!players.includes(obj["player"])) {
      return obj;
    }
  });

  let finalArray = removedArray.concat(playersTotalYearlyStats);

  return finalArray;
};

const percentileRank = (data, stat, percentile) => {
  data = removeNanVals(data, stat);
  data = removeDoublePlayerEntries(data);

  // Remove data where the stat is perfect percentage. Statistically this is very unlikely.
  // For example someone who shoots three regularly is unlikely to go perfect shooting in the whole year,
  // unless they only shot a handfull of threes. Since there is no data availaible to check the numebr of
  // threes the player shot in the year, this is a test to take these values out.
  data = data.filter((obj) => obj[stat] !== "1.000");

  let sortedArray = data.sort((a, b) => a[stat] - b[stat]);
  let rank = Math.floor((percentile / 100) * sortedArray.length);

  return sortedArray[rank - 1];
};

export const main = async (year, stat, percentile) => {
  // Make API Call
  let data = await fetchYearlyData(year, stat);
  // Return data array
  return percentileRank(data, stat, percentile);
};
