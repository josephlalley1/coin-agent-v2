const rp = require('request-promise');

function totalAssetsValue() {
  rp({
    method: 'GET',
    url: 'https://api.coinranking.com/v1/public/coins'
  }).then(externalResult => {
    const externalData = JSON.parse(externalResult)
    console.log('new request')
    rp({
      method: 'GET',
      url: 'http://localhost:4000/api/trades'
    }).then(expressResult => {
      const trades = JSON.parse(expressResult)
      const totalPortfolioValue = []
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      console.log(trades)
      console.log(externalData.data.coins)
      trades.filter(trade => trade.transactionAddedBy === '5be9ab34206c80cc7c53dd09').map(
        (trade => {
          totalPortfolioValue.push(trade.transactionTotal * parseFloat(externalData.data.coins.filter(coin => coin.symbol === trade.symbol)[0].price))
        })
      )
      console.log(totalPortfolioValue.reduce(reducer))
    })
  })
}

module.exports = {
  total: totalAssetsValue
}
