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
        result.data.data.coins.length = 20;
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
      <div>
        {this.state.externalData && this.state.externalData.map(
          (coin, i) =>
            <div key={i} className="chart-box" style={{display: 'inline-block'}}>
              <h1 style={{textAlign: 'center'}}>{coin.name}</h1>
              <ChartLine key={i} data={data[coin.name]}/>
              {console.log('this is the data for', coin.name, ':', data[coin.name])}
            </div>)}

        <div className="portfolio-container">
          <div className="pa4">
            <div className="overflow-auto">
              <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Coin</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Coin Name</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Price</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Symbol</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Market Cap</th>
                    <th className="fw6 bb b--light-gray tl pb3 pr3 bg-white">Website</th>
                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {this.state.externalData && this.state.externalData.map(
                    (coin, i) =>
                      <tr key={i}>
                        {this.state.externalData && <td className="pv3 pr3 bb b--light-gray"><img src={coin.iconUrl} width="30px"/></td>}
                        <td className="pv3 pr3 bb b--light-gray">{coin.name}</td>
                        <td className="pv3 pr3 bb b--light-gray">${parseFloat(coin.price).toFixed(2)}</td>
                        <td className="pv3 pr3 bb b--light-gray">{coin.symbol}</td>
                        <td className="pv3 pr3 bb b--light-gray">${this.numberWithCommas(coin.marketCap)}</td>
                        <td className="pv3 pr3 bb b--light-gray"><a href={coin.websiteUrl} className="remove-a-styling">{coin.websiteUrl}</a></td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
