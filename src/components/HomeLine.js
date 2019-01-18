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
        backgroundColor: '#838df4',
        borderColor: '#3c4bee',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#3c4bee',
        pointBackgroundColor: '#3c4bee',
        pointBorderWidth: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#3c4bee',
        pointHoverBorderColor: '#3c4bee',
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
      axes: [
        {
          display: false,
          gridLines: {
            display: false
          },
          labels: {
            show: false
          }
        }
      ]
    }
  };

  return <Line data={chartData} options={chartOptions} width="400"/>;
};

export default ChartLine;
