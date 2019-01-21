import React from 'react';
import axios from 'axios';
import { decodeToken } from '../lib/auth';
import ChartLine from './HomeLine.js';

class TradeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createHotList = this.createHotList.bind(this);

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

  createHotList(data) {
    const hotList = [];
    const sorting = (a,b) => b.change - a.change;
    data.map(
      (coin) =>
        hotList.push({name: coin.name, price: coin.price, change: coin.change}),
    )
    hotList.sort(sorting);
    hotList.length = 5;

    return hotList
  }

  render() {
    const { externalData } = this.state;
    if (!externalData) return null;

    const data = externalData.reduce((lineChartData, coin) => {
      lineChartData[coin.name] = coin.history.map((price) => [
        parseFloat(price)
      ]);
      return lineChartData;
    }, {});

    const totalPortfolioValue = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const highestDailyChange = this.createHotList(this.state.externalData);

    return (
      <div className="dashboard-container">
        <h2 className="heading">Dashboard</h2>

        {this.state.externalData && this.state.trades && this.state.trades.filter(trade => trade.transactionAddedBy === decodeToken().sub).map(
          (trade) => {
            totalPortfolioValue.push(trade.transactionTotal * parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price))
          }
        )}

        { totalPortfolioValue.length > 0 &&
          <div className="overview-container">
            <div className="overview-boxes">
              <div className="assets-box">
                <h2 className="subheading sec-text-color coin-names">Total Assets Value</h2>
                <p className="body coin-info total-value">${parseFloat(totalPortfolioValue.reduce(reducer)).toFixed(2)}<span className="currency-tag"> USD</span></p>
              </div>
            </div>
            <div className="overview-boxes">
              <div className="assets-box">
                <img className="large-icon" src={this.state.externalData[0].iconUrl}/>
                <div className="assets-text">
                  <h2 className="subheading sec-text-color coin-names">{this.state.externalData[0].name}</h2>
                  <p className="body coin-info price-value">${parseFloat(this.state.externalData[0].price).toFixed(2)}<span className="currency-tag"> USD</span></p>
                </div>
                <p className="body coin-info sec-text-color change24h">{this.state.externalData[0].change}% 24h</p>
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
                  <p className="body coin-info price-value">${parseFloat(this.state.externalData[0].price).toFixed(2)}<span className="currency-tag"> USD</span></p>
                </div>
                <p className="body coin-info sec-text-color change24h">{this.state.externalData[1].change}% 24h</p>
                <div className="assets-chart">
                  <ChartLine data={data[this.state.externalData[1].name]}/>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="main-container">
          <div className="portfolio-container">
            <div className="portfolio-content">
              <div className="portfolio-title">
                <h2 className="subheading sec-text-color coin-names">Portfolio Performance</h2>
              </div>
            </div>
            <div className="portfolio-unav">
              <div className="portfolio-placeholder">
                <h2 className="subheading sec-text-color coin-names coming-soon">Feature coming soon</h2>
              </div>
            </div>
          </div>

          <div className="hotcoins-container">
            <div className="hotcoins-content">
              <div className="hotcoins-title">
                <h2 className="subheading sec-text-color coin-names">Hot Coins</h2>
              </div>

              <div className="hotcoins-info">
                <div className="hotcoins-entry">
                  <div className="hotcoins-text">
                    <h2 className="subheading sec-text-color hotcoins-size"><span className="hotcoins-arrows">↗</span> {highestDailyChange[0].name}</h2>
                    <p className="body coin-info hotcoins-pricing">${parseFloat(highestDailyChange[0].price).toFixed(4)}<span className="currency-tag"> USD</span></p>
                  </div>
                  <p className="body coin-info sec-text-color change24h">{highestDailyChange[0].change}% 24h</p>
                </div>

                <div className="hotcoins-entry">
                  <div className="hotcoins-text">
                    <h2 className="subheading sec-text-color hotcoins-size"><span className="hotcoins-arrows">↗</span> {highestDailyChange[1].name}</h2>
                    <p className="body coin-info hotcoins-pricing">${parseFloat(highestDailyChange[1].price).toFixed(4)}<span className="currency-tag"> USD</span></p>
                  </div>
                  <p className="body coin-info sec-text-color change24h hotcoins-change">{highestDailyChange[1].change}% 24h</p>
                </div>

                <div className="hotcoins-entry">
                  <div className="hotcoins-text">
                    <h2 className="subheading sec-text-color hotcoins-size"><span className="hotcoins-arrows">↗</span> {highestDailyChange[2].name}</h2>
                    <p className="body coin-info hotcoins-pricing">${parseFloat(highestDailyChange[2].price).toFixed(4)}<span className="currency-tag"> USD</span></p>
                  </div>
                  <p className="body coin-info sec-text-color change24h hotcoins-change">{highestDailyChange[2].change}% 24h</p>
                </div>

                <div className="hotcoins-entry">
                  <div className="hotcoins-text">
                    <h2 className="subheading sec-text-color hotcoins-size"><span className="hotcoins-arrows">↗</span> {highestDailyChange[3].name}</h2>
                    <p className="body coin-info hotcoins-pricing">${parseFloat(highestDailyChange[3].price).toFixed(4)}<span className="currency-tag"> USD</span></p>
                  </div>
                  <p className="body coin-info sec-text-color change24h hotcoins-change">{highestDailyChange[3].change}% 24h</p>
                </div>

                <div className="hotcoins-entry bottom-entry">
                  <div className="hotcoins-text">
                    <h2 className="subheading sec-text-color hotcoins-size"><span className="hotcoins-arrows">↗</span> {highestDailyChange[4].name}</h2>
                    <p className="body coin-info hotcoins-pricing">${parseFloat(highestDailyChange[4].price).toFixed(4)}<span className="currency-tag"> USD</span></p>
                  </div>
                  <p className="body coin-info sec-text-color change24h hotcoins-change">{highestDailyChange[4].change}% 24h</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TradeIndex;
