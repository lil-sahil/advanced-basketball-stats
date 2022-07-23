import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useEffect, useState } from "react";

import { main } from "../utils/statCalcs";

import { getPlayerId } from "../utils/getPlayerId";

import { fetchGeneralData } from "../utils/fetchGeneralData";

const Chart = (props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const getTopPlayersImages = async (labels) => {
    let images = await Promise.all(
      labels.map(async (year, index) => {
        let playerData = await fetchGeneralData(graphData[3][index].player);
        let playerId = await getPlayerId(playerData);

        let img = new Image(82.11, 60);
        img.src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;

        img.onerror = () => {
          img.src = require("../assets/logoman.png");
        };

        return img;
      })
    );
    return images;
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (context.dataset.label === "100th percentile") {
              label += ": ";
              label += context.dataset.playerName[context.dataIndex];
            }
            return label;
          },
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = props.playerData.map((item) => {
    return item.Year;
  });

  let [graphData, setGraphData] = useState([]);
  let [topPlayerImages, setTopPlayerImages] = useState([]);

  useEffect(() => {
    let getData = async (arrayOfPercentiles) => {
      // Clear state on re-render
      setGraphData([]);

      // Loop through the percentiles and fetch the results and save in state.
      let percentileDataArray = [];
      for (let percentile of arrayOfPercentiles) {
        let data = await Promise.all(
          labels.map((year) => {
            return main(year, props.statSelection, percentile);
          })
        );
        percentileDataArray.push(data);
      }
      setGraphData(percentileDataArray);
    };
    getData([25, 50, 75, 100]);
  }, [props.statSelection, props.playerData]);

  function sleep(ms) {
    return new Promise((resolveFunc) => setTimeout(resolveFunc, ms));
  }

  useEffect(() => {
    const updateImages = async () => {
      setTopPlayerImages([]);
      let images = await getTopPlayersImages(labels);
      await sleep(2000);
      setTopPlayerImages(images);
    };
    if (graphData[3]) {
      updateImages();
    }
  }, [graphData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: props.playerData.map((item) =>
          parseFloat(item.Data[0][props.statSelection])
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        fill: true,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        label: "25th percentile",
        data: graphData[0]?.map((item) => item[props.statSelection]),
      },
      {
        fill: "-1",
        label: "50th percentile",
        data: graphData[1]?.map((item) => item[props.statSelection]),
      },
      {
        fill: "-1",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        label: "75th percentile",
        data: graphData[2]?.map((item) => item[props.statSelection]),
      },
      {
        fill: "-1",
        backgroundColor: "rgba(10, 162, 235, 0.5)",
        label: "100th percentile",
        data: graphData[3]?.map((item) => item[props.statSelection]),
        playerName: graphData[3]?.map((item) => item.player),

        pointStyle: topPlayerImages,
      },
    ],
  };

  return (
    <div id="chart" className="h-4/5 w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
