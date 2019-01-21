import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { decodeToken } from '../../lib/auth';

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
    return (
      <div className="trades-container">
        <h2 className="heading">My Trades</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="coin-table">Coin</th>
                <th className="coinname-table">Coin Name</th>
                <th className="symbol-table">Symbol</th>
                <th className="qty-table">Qty</th>
                <th className="price-table">Price</th>
                <th className="qty-table">Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.trades && this.state.trades.filter(trade => trade.transactionAddedBy === decodeToken().sub).map(
                (trade, i) =>
                  <tr key={i}>
                    {this.state.externalData && <td><img src={this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].iconUrl} width="30px"/></td>}
                    <td>{trade.coinName}</td>
                    <td>{trade.symbol}</td>
                    <td>{trade.transactionTotal}</td>
                    { this.state.externalData && <td>{this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price}</td>}
                    { this.state.externalData && <td>${(trade.transactionTotal * parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price)).toFixed(2) }</td> }
                    <td><Link to={`/trades/${trade._id}`}  key={i}>View Trade</Link></td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}
export default TradeIndex;
