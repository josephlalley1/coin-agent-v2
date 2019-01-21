import React from 'react';
import axios from 'axios';
import ChartLine from './HomeLine.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: {

        }
      }
    };
  }

  componentDidMount() {
    axios.get('https://api.coinranking.com/v1/public/coins')
      .then((result) => {
        result.data.data.coins.length = 21;
        this.setState({ externalData: result.data.data.coins });
        console.log(this.state.externalData);
      });

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    const { externalData } = this.state;
    if (!externalData) return null;

    const data = externalData.reduce((lineChartData, coin) => {
      console.log(lineChartData);
      lineChartData[coin.name] = coin.history.map((price) => [
        parseFloat(price)
      ]);
      return lineChartData;
    }, {});
    console.log(data);

    return (
      <div className="chart-container">
        {this.state.externalData && this.state.externalData.map(
          (coin, i) =>
            <div key={i} className="chart-item">
              <div className="chart-content">
                <img className="large-icon" src={coin.iconUrl}/>
                <div className="small-chart-text">
                  <h2 className="subheading sec-text-color coin-names">{coin.name}</h2>
                  <p className="body coin-info">{parseFloat(coin.price).toFixed(2)}<span className="currency-tag"> USD</span></p>
                </div>
                <div className="chart-div">
                  <ChartLine key={i} data={data[coin.name]}/>
                </div>
              </div>
            </div>
        )}
      </div>
    );
  }
}

export default Home;
