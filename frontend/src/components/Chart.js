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
      },
    ],
  };

  return (
    <div id="chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
