import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        axios.get(`https://api.coinranking.com/v1/public/coin/${coinId}/history/24h`)
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

    const trade = this.state.trade;
    return (
      <div className="dashboard-container">
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
              <h2 className="subheading sec-text-color coin-names">Your Holdings</h2>
              <p className="body coin-info total-value">{(trade.transactionTotal * parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price)).toFixed(2) }<span className="currency-tag"> USD</span></p>
            </div>
          </div>
        </div>
        <Link to={`/trades/${this.props.match.params.id}/edit`} className="f6 link dim br2 ba ph3 pv2 mb2 dib remove-a-styling">Edit Trade</Link>
        <a className="f6 link dim br2 ba ph3 pv2 mb2 dib remove-a-styling button-margins" onClick={this.handleDelete}>Delete Trade</a>
      </div>
    );
  }
}

export default TradeShow;
