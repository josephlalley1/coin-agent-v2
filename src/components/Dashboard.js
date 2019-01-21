import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { decodeToken } from '../lib/auth';

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

        <div className="overview-container">
          { totalPortfolioValue.length > 0 &&
            <div className="overview-boxes">
              <h2>Total Assets Value = ${totalPortfolioValue.reduce(reducer)}</h2>
            </div>
          }
        </div>




        { this.state.externalData &&
          <div>
            <h2>Featured Coins - By Market Cap </h2>
            <p>{this.state.externalData[0].name}</p>
            <p>{this.state.externalData[0].price}</p>
            <p>{this.state.externalData[1].name}</p>
            <p>{this.state.externalData[1].price}</p>
          </div>
        }
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
