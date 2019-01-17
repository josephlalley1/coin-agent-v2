const rp = require('request-promise');

function totalAssetsValue() {
  rp({
    method: 'GET',
    url: 'https://api.coinranking.com/v1/public/coins'
  }).then(result => {
    const results = JSON.parse(result)
    console.log(results.data)
    console.log('new request')
  })
}

// NEED TO JSONIFY THE RESPONSE TO READ IT

module.exports = {
  total: totalAssetsValue
}
