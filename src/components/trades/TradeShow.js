import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Chart from '../Chart';

class TradeShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // chartData: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  // getChartData(){
  //   const coinId = this.state.externalData.filter(coin => coin.name === this.state.trade.coinName)[0].id;
  //   console.log('this is the externaldata filtered', this.state.externalData.filter(coin => coin.name === this.state.trade.coinName)[0].id);
  //   console.log('this is the this.state.trade', this.state.trade);
  //   console.log('this is the coin id', coinId);
  //   axios.get(`https://api.coinranking.com/v1/public/coin/${coinId}`)
  //     .then((coinHistoricalData) => this.setState({ chartData: {
  //       labels: [],
  //       datasets: [{
  //         label: `Last ${coinHistoricalData.data.data.coin.history.length} days for ${this.state.trade.coinName}`,
  //         data: coinHistoricalData.data.data.coin.history
  //       }]
  //     }}));
  // }

  componentDidMount() {
    axios.all([
      axios.get(`/api/trades/${this.props.match.params.id}`),
      axios.get('https://api.coinranking.com/v1/public/coins')
    ])
      .then(axios.spread((trade, externalCoinData) => {
        this.setState({ trade: trade.data });
        this.setState({ externalData: externalCoinData.data.data.coins });
        console.log(this.state);
        // this.getChartData();
      }));

  }

  handleDelete(event){
    event.preventDefault();
    console.log(this.state);
    axios.delete(`/api/trades/${this.state.trade._id}`)
      .then( () => this.props.history.push('/trades/'));
  }

  render() {
    const trade = this.state.trade;
    return (
      <main>
        {trade
          ?
          <div>
            <article className="pa3 pa5-ns" data-name="slab-stat-large">
              <h3 className="b f6 ttu tracked">Trade Info</h3>
              <br></br>
              <div className="cf">
                <dl className="db dib-l w-auto-l lh-title mr6-l">
                  <dd className="b f6 fw4 ml0">Amount</dd>
                  <dd className="f2 f-subheadline-l fw6 ml0">{trade.transactionTotal}</dd>
                </dl>
                <dl className="db dib-l w-auto-l lh-title mr6-l">
                  <dd className="b f6 fw4 ml0">Coin Name</dd>
                  <dd className="f2 f-subheadline-l fw6 ml0">{trade.coinName}</dd>
                </dl>
                <dl className="db dib-l w-auto-l lh-title mr6-l">
                  <dd className="b f6 fw4 ml0">Value</dd>
                  {this.state.externalData && <dd className="f2 f-subheadline-l fw6 ml0">${(trade.transactionTotal * parseFloat(this.state.externalData.filter(coin => coin.symbol === trade.symbol)[0].price)).toFixed(2) }</dd>}
                </dl>
              </div>
              <br></br>
              <br></br>
              <Link to={`/trades/${this.props.match.params.id}/edit`} className="f6 link dim br2 ba ph3 pv2 mb2 dib remove-a-styling">Edit Trade</Link>
              <a className="f6 link dim br2 ba ph3 pv2 mb2 dib remove-a-styling button-margins" onClick={this.handleDelete}>Delete Trade</a>
            </article>
            {/* <Chart chartData={this.state.chartData}/> */}
          </div>
          :
          <p>🏛🏛🏛 Waiting for trade 🏛🏛🏛</p>
        }
      </main>
    );
  }
}

export default TradeShow;
