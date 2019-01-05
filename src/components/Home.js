import React from 'react';
import axios from 'axios';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('https://api.coinranking.com/v1/public/coins')
      .then((result) => {
        result.data.data.coins.length = 20;
        this.setState({ externalData: result.data.data.coins });
        console.log(this.state);
      });

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    return (
      <div>
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
