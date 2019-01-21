import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartLine = ({ data }) => {
  console.log(data);
  const chartData = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', ''],
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#838df4',
        borderColor: '#FFFFFF',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FFFFFF',
        pointBackgroundColor: '#FFFFFF',
        pointBorderWidth: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#FFFFFF',
        pointHoverBorderColor: '#FFFFFF',
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
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    }
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default ChartLine;
