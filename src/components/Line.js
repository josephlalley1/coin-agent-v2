import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartLine = ({ data }) => {
  console.log(data);
  const chartData = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: '',
        fill: true,
        lineTension: 0.1,
        backgroundColor: '#9da5db',
        borderColor: '#5C6AC4',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#5C6AC4',
        pointBackgroundColor: '#5C6AC4',
        pointBorderWidth: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#5C6AC4',
        pointHoverBorderColor: '#5C6AC4',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
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
