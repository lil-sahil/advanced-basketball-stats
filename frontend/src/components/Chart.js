import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
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

  let [graphData, setGraphData] = useState();

  useEffect(() => {
    let test = async () => {
      setGraphData(
        await Promise.all(
          labels.map((year) => {
            console.log("Iamhere");
            return main(year, props.statSelection, 25);
          })
        )
      );
    };
    test();
    console.log("I ran!");
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
        label: "25th percentile",
        data: graphData,
      },
    ],
  };

  // console.log(data.datasets[1]);

  return (
    <div id="chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
