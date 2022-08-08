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
