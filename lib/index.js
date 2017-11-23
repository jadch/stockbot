const getLastPrice = require('./getLastPrice');

exports.lastPrice = (req, res) => {
  const { ticker } = req.body.result.parameters;

  getLastPrice(ticker).then(output => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ speech: output, displayText: output }));
  }).catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ speech: error, displayText: error }));
  });
};