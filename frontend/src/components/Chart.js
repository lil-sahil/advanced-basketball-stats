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

import LoadingSpinner from "./LoadingSpinner";

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

  let [graphData, setGraphData] = useState([]);
  let [topPlayerImages, setTopPlayerImages] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  const getTopPlayersImages = async (labels) => {
    let images = await Promise.all(
      labels.map(async (year, index) => {
        let playerData = await fetchGeneralData(graphData[3][index].player);
        let playerId = await getPlayerId(playerData);

        let img = new Image(82.11, 60);

        img.src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;
        img.style["border"] = "red 1px solid";
        img.style["border-radius"] = "50%";

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
    scales: {
      x: {
        grid: {
          color: "rgba(247, 245, 245, 0.3)",
          borderColor: "#ffffff",
          borderWidth: 3,
          z: -1,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(247, 245, 245, 0.3)",
          borderColor: "#ffffff",
          borderWidth: 3,
          z: -1,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grace: "10%",
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (context.dataset.label === "100th percentile") {
              label = context.dataset.playerName[context.dataIndex];
            }
            return label;
          },
        },
      },
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: false,
        text: "Player Stats",
      },

      filler: {
        propogate: false,
      },
    },
    onClick: (e, activeEls) => {
      let datasetIndex = activeEls[0].datasetIndex;

      if (e.chart._metasets[datasetIndex].label !== "100th percentile") {
        return 1;
      }
      let playerIndex = activeEls[0].index;
      let player =
        e.chart._metasets[datasetIndex]._dataset.playerName[playerIndex];

      const fetchData = async (searchString) => {
        let response = await fetch(
          `http://localhost:5000/api/${searchString}`,
          {
            mode: "cors",
          }
        );
        let data = await response.json();

        props.setPlayerData(data);
        props.setPlayerName(data[0].Data[0].player);
        props.setResponse("good");
        return 1;
      };

      fetchData(player);
    },
  };

  const labels = props.playerData.map((item) => {
    return item.Year;
  });

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
      setIsLoading(false);
    };
    setIsLoading(true);
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
      setIsLoading(false);
    };
    if (graphData[3]) {
      setIsLoading(true);
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
        fill: "origin",
        backgroundColor: "rgba(212, 32, 25, 0.5)",
        label: "< 25th percentile",
        data: graphData[0]?.map((item) => item[props.statSelection]),
      },
      {
        fill: "1",
        backgroundColor: "rgba(250, 213, 80, 0.5)",
        label: "< 50th percentile",
        data: graphData[1]?.map((item) => item[props.statSelection]),
      },
      {
        fill: "-2",
        backgroundColor: "rgba(5, 135, 18, 0.5)",
        label: "< 75th percentile",
        data: graphData[2]?.map((item) => item[props.statSelection]),
      },
      {
        borderColor: "rgba(255,215,0, 0.4)",
        label: "100th percentile",
        data: graphData[3]?.map((item) => item[props.statSelection]),
        playerName: graphData[3]?.map((item) => item.player),
        pointStyle: topPlayerImages,
      },
    ],
  };

  return (
    <>
      {isLoading === true ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div id="chart" className="w-full">
          <Line options={options} data={data} />
        </div>
      )}
    </>
  );
};

export default Chart;
