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

  import LoadingSpinner from "./LoadingSpinner";

  
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

    let [graphData, setGraphData] = useState([]);
    let [topPlayerImages, setTopPlayerImages] = useState(null);
    let [isloading, setIsloading] = useState(false)

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
            display: () => {
              return props.yearSelection === "All" ? true : false
            },
            color: "#ffffff",
            font: {
              size: 14,
            },
          },
          title: {
            display: true,
            text: () => {
              return props.yearSelection === "All" ? "Year" : "Player"
            },
            color: "#ffffff",
            font: {
              size: 14,
              weight: "bold",
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
          title: {
            display: true,
            text: props.statSelection,
            color: "#ffffff",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {

              let label
              if (context.dataset.label === "Leaders"){

  
                if (props.yearSelection === "All"){
                  label =  `${graphData[0][context.dataIndex].player} - ${context.dataset.data[context.dataIndex]}`

                }else {
                  label = context.raw;
                }
              }else {
                label =  context.dataset.data[context.dataIndex]
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
          text: "Yearly Stats",
        },
      },

      onClick: (e, activeEls, context) => {

      let datasetIndex = activeEls[0].datasetIndex;
      let playerIndex = activeEls[0].index;
      let player

      
      try{

        if ( (e.chart._metasets[datasetIndex].label !== "Leaders") & (e.chart._metasets[datasetIndex].label !== "Players") ) {
          return 1;
        }
      }catch{
        return 1
      }



      if (props.yearSelection === "All"){        
        player =
          graphData[datasetIndex][playerIndex].player;
      }else {
        player = context.tooltip.title[0]
      }


      const fetchData = async (searchString) => {
        let response = await fetch(
          `http://localhost:5000/api/${searchString}`,
          {
            mode: "cors",
          }
        );
        let data = await response.json();
        console.log(data)
        
        props.setSearchOption("Player")
        props.setPlayerData(data);
        props.setPlayerName(data[0].Data[0].player);
        props.setResponse("good");
        return 1;
      };

      fetchData(player);
        
      },
      
    };
    
  

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
          setIsloading(true)

        };

        if (props.yearSelection === 'All'){
          setIsloading(true)
          getData([100, 50]);
        }

      }, [props.statSelection, props.yearData]);



      function sleep(ms) {
        return new Promise((resolveFunc) => setTimeout(resolveFunc, ms));
      }

      useEffect(() => {
        const updateImages = async () => {
          setTopPlayerImages(null);
          let images = await getTopPlayersImages(labels);
          await sleep(2000);
          setTopPlayerImages(images);
          setIsloading(false)
        };
        if (graphData[0]) {
          setIsloading(true)

          updateImages();
        }
      }, [graphData]);



    let datasetsIndividualYear = [
      {
        fill: false,
        label: "Players",
        data: props.data.map(item => parseFloat(item[props.statSelection])),
        backgroundColor: "rgba(255, 99, 132)",
      }
    ]


    let datasetAllYears = [
      // 100th percentile
      {
        fill: false,
        borderColor: "rgba(255,215,0, 0.4)",
        // backgroundColor: "rgba(53, 162, 235, 0.5)",
        label: "Leaders",
        data: graphData[0]?.map((item) => item[props.statSelection]),
        pointStyle: topPlayerImages,

      },
      
      // 50th percentile
      {
        fill: false,
        borderColor: "rgb(255, 99, 132)",
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

      <>
        {(isloading === true ) ? <LoadingSpinner></LoadingSpinner> : 
          <div id="chart" className="w-8/12 ml-20 h-full">
            <Line options={options} data={data} />
         </div>
        }
      
      </>
    );
  };
  
  export default YearDataChart;