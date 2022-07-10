const fetchYearlyData = async (year, stat) => {
  let response = await fetch(
    `http://localhost:5000/api/yearly_data/${year}/${stat}`
  );
  return await response.json();
};

const percentileRank = (data, stat, percentile) => {
  data = data.map((item) => {
    return parseFloat(item[stat]);
  });
  let sortedArray = data.sort((a, b) => a - b);
  let rank = Math.floor((percentile / 100) * (sortedArray.length + 1));
  return sortedArray[rank];
};

export const main = async (year, stat, rank) => {
  // Make API Call
  let data = await fetchYearlyData(year, stat);
  // Return data array
  return percentileRank(data, stat, rank);
};
