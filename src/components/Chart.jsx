import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({ x, y }) => {
  const chartData = {
    labels: x.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Score',
        data: y,
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        pointBackgroundColor: '#1976d2',
        pointBorderColor: '#fff',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: context => `Score: ${context.raw}`
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Score',
        },
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Chart;
