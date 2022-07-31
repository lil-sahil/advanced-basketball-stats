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

  import { years } from "../config/yearConfig";

  
  const YearDataChart = (props) => {
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
    
    let [graphData, setGraphData] = useState([]);
    let [topPlayerImages, setTopPlayerImages] = useState([]);

    // Labels
    const labels = (() => {
        return props.yearSelection === "All" ? years.filter(item => item !== "All") : props.data.map(item => item.player) 
    })() 
    

    const getTopPlayersImages = async (labels) => {
      let images = await Promise.all(
        labels.map(async (year, index) => {
          let playerData = await fetchGeneralData(graphData[0][index].player);
          let playerId = await getPlayerId(playerData);
  
          let img = new Image(54.74, 40);
  
          img.src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;
          
  
          img.onerror = () => {
            img.src = require("../assets/logoman.png");
          };
  
          return img;
        })
      );
      return images;
    };


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

        if (props.yearSelection === 'All'){

          getData([100, 50]);
        }

      }, [props.statSelection, props.yearData]);



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
        if (graphData[0]) {
          updateImages();
        }
      }, [graphData]);


    let datasetsIndividualYear = [
      {
        fill: false,
        label: "Players",
        data: props.data.map(item => parseFloat(item[props.statSelection])),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ]


    let datasetAllYears = [
      // 100th percentile
      {
        fill: false,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        label: "Leaders",
        data: graphData[0]?.map((item) => item[props.statSelection]),
        pointStyle: topPlayerImages,

      },
      
      // 50th percentile
      {
        fill: false,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        label: "50th Percentile",
        data: graphData[1]?.map((item) => item[props.statSelection]),
      },
    ]

  
  
    const data = {
      labels,
      datasets: (() => {
        return props.yearSelection === "All" ? datasetAllYears : datasetsIndividualYear 
      })()
    };
  
    return (
      <div id="chart" className="h-4/5 w-full">
        <Line options={options} data={data} />
      </div>
    );
  };
  
  export default YearDataChart;