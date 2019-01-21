import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { decodeToken } from '../lib/auth';
import ChartLine from './HomeLine.js';

class TradeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/trades'),
      axios.get('https://api.coinranking.com/v1/public/coins')
    ])
      .then(axios.spread((localTrades, externalCoinData) => {
        this.setState({ trades: localTrades.data });
        this.setState({ externalData: externalCoinData.data.data.coins });
        console.log(this.state);
        const a = this.state.externalData;
        console.log(a);
      }));
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
    const totalPortfolioValue = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const highestHourlyChange = []
    const sorting = (a,b) => b - a;
    return (
      <div className="dashboard-container">
        <h2 className="heading">Dashboard</h2>

        {this.state.externalData && this.state.trades && this.state.trades.filter(trade => trade.transactionAddedBy === decodeToken().sub).map(
          (trade) => {
            totalPortfolioValue.push(trade.transactionTotal * parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price))
          }
        ), totalPortfolioValue.length > 0 && console.log('this is the total portfolio value, reduced', totalPortfolioValue.reduce(reducer))}

        { totalPortfolioValue.length > 0 &&
          <div className="overview-container">
            <div className="overview-boxes">
              <div className="assets-box">
                <h2 className="subheading sec-text-color">Total Assets Value</h2>
                <p className="body coin-info total-value">{totalPortfolioValue.reduce(reducer)}<span className="currency-tag"> USD</span></p>
              </div>
            </div>
            <div className="overview-boxes">
              <div className="assets-box">
                <img className="large-icon" src={this.state.externalData[0].iconUrl}/>
                <div className="assets-text">
                  <h2 className="subheading sec-text-color coin-names">{this.state.externalData[0].name}</h2>
                  <p className="body coin-info price-value">{this.state.externalData[0].price}<span className="currency-tag"> USD</span></p>
                </div>
                <p className="body coin-info sec-text-color change24h">{this.state.externalData[0].change}% 24hr</p>
                <div className="assets-chart">
                  <ChartLine data={data[this.state.externalData[0].name]}/>
                </div>
              </div>
            </div>
            <div className="overview-boxes">
              <div className="assets-box">
                <img className="large-icon" src={this.state.externalData[1].iconUrl}/>
                <div className="assets-text">
                  <h2 className="subheading sec-text-color coin-names">{this.state.externalData[1].name}</h2>
                  <p className="body coin-info price-value">{this.state.externalData[1].price}<span className="currency-tag"> USD</span></p>
                </div>
                <p className="body coin-info sec-text-color change24h">{this.state.externalData[1].change}% 24hr</p>
                <div className="assets-chart">
                  <ChartLine data={data[this.state.externalData[1].name]}/>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="main-container">
          <div className="portfolio-container">

          </div>
          <div className="hotcoins-container">

          </div>
        </div>

        { this.state.externalData && this.state.externalData.map(
          (coin) => {
            highestHourlyChange.push(coin.change)
            highestHourlyChange.sort(sorting)
            highestHourlyChange.length = 5
          }
        )
        }

        <div>
          <br></br>
          <h2>HOT Coins - By Change In Past 24 Hours </h2>
          { highestHourlyChange.map(
            (changeValue, i) =>
              <p key={i}>{changeValue}</p>
          )
          }
        </div>
      </div>
    );
  }
}
export default TradeIndex;
