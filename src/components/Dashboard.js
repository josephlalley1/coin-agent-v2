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
      <div>
        <h1>DASHBOARD</h1>
        <div className="portfolio-container">
          <div className="pa4">
            <div className="overflow-auto">
              {this.state.externalData && this.state.trades && this.state.trades.filter(trade => trade.transactionAddedBy === decodeToken().sub).map(
                (trade) => {
                  totalPortfolioValue.push(trade.transactionTotal * parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price))
                }
              ), totalPortfolioValue.length > 0 && console.log('this is the total portfolio value, reduced', totalPortfolioValue.reduce(reducer))}
              <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Coin</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Coin Name</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Amount</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Symbol</th>

                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Value</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">ID</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white"></th>
                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {this.state.trades && this.state.trades.filter(trade => trade.transactionAddedBy === decodeToken().sub).map(
                    (trade, i) =>
                      <tr key={i}>
                        {this.state.externalData && <td className="pv3 pr3 bb b--light-gray"><img src={this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].iconUrl} width="30px"/></td>}
                        <td className="pv3 pr3 bb b--light-gray">{trade.coinName}</td>
                        <td className="pv3 pr3 bb b--light-gray">{trade.transactionTotal}</td>
                        <td className="pv3 pr3 bb b--light-gray">{trade.symbol}</td>

                        {this.state.externalData && <td className="pv3 pr3 bb b--light-gray">${(trade.transactionTotal * parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price)).toFixed(2)}</td> }
                        <td className="pv3 pr3 bb b--light-gray">{trade._id}</td>
                        <td className="pv3 pr3 bb b--light-gray tr"><Link to={`/trades/${trade._id}`}  key={i} className="remove-a-styling">View Trade</Link></td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
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

        { totalPortfolioValue.length > 0 &&
          <div className="total-assets-box">
            <br></br>
            <h2>Total Assets Value = ${totalPortfolioValue.reduce(reducer)}</h2>
          </div>
        }
      </div>
    );
  }
}
export default TradeIndex;
