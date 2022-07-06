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
    ],
  };

  return (
    <div id="chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
