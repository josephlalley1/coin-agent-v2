import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ChartLine from '../ShowLine.js';

class TradeShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.all([
      axios.get(`/api/trades/${this.props.match.params.id}`),
      axios.get('https://api.coinranking.com/v1/public/coins')
    ])
      .then(axios.spread((trade, externalCoinData) => {
        this.setState({ trade: trade.data });
        this.setState({ externalData: externalCoinData.data.data.coins });
        console.log(this.state);
        console.log(this.state.externalData)
        console.log(this.state.externalData.filter(coin => coin.symbol === this.state.trade.symbol)[0])
        const coinId = this.state.externalData.filter(coin => coin.symbol === this.state.trade.symbol)[0].id
        axios.get(`https://api.coinranking.com/v1/public/coin/${coinId}/history/7d`)
          .then((result) => {
            console.log(result)
            this.setState({ coinHistory: result.data.data.history })
            console.log('this is the coin history block', this.state)
          })
      }));
  }

  handleDelete(event){
    event.preventDefault();
    console.log(this.state);
    axios.delete(`/api/trades/${this.state.trade._id}`)
      .then( () => this.props.history.push('/trades'));
  }

  render() {
    const { coinHistory } = this.state;
    if (!coinHistory) return null;
    const data = []

    coinHistory.map((entry) => {
      const emptyArray = []
      emptyArray.push(parseFloat(entry.price))
      data.push(emptyArray)
    })

    console.log(data)

    const trade = this.state.trade;
    return (
      <div className="dashboard-container">
        <a onClick={this.handleDelete} className="button-small">Delete this trade</a>
        <Link to={`/trades/${this.props.match.params.id}/edit`} className="button-small button-spacing">Edit a trade</Link>
        <h2 className="heading">{trade.coinName}</h2>
        <div className="overview-container">
          <div className="overview-boxes">
            <div className="assets-box">
              <h2 className="subheading sec-text-color coin-names">Your Holdings</h2>
              <p className="body coin-info total-value">{trade.transactionTotal}<span className="currency-tag"> {trade.symbol}</span></p>
            </div>
          </div>
          <div className="overview-boxes">
            <div className="assets-box">
              <h2 className="subheading sec-text-color coin-names">Current Price</h2>
              <p className="body coin-info total-value">{parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price).toFixed(4)}<span className="currency-tag"> {trade.symbol}</span></p>
            </div>
          </div>
          <div className="overview-boxes">
            <div className="assets-box">
              <h2 className="subheading sec-text-color coin-names">Holdings Value</h2>
              <p className="body coin-info total-value">{(trade.transactionTotal * parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price)).toFixed(2) }<span className="currency-tag"> USD</span></p>
            </div>
          </div>
        </div>

        <div className="trade-container">
          <div className="trade-content">
            <div className="trade-title">
              <h2 className="subheading sec-text-color coin-names">{trade.coinName} Performance</h2>
            </div>
            <div className="trade-chart">
              <ChartLine data={data}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TradeShow;
