import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartLine = ({ data }) => {
  console.log(data);
  const chartData = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'white',
        borderColor: 'green',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'blue',
        pointBackgroundColor: 'blue',
        pointBorderWidth: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: 'blue',
        pointHoverBorderColor: 'blue',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 1,
        data: data
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ]
    },
    yAxes: [
      {
        display: false,
        labels: {
          show: false
        }
      }
    ]
  };

  return <Line data={chartData} options={chartOptions} width="400"/>;
};

export default ChartLine;
