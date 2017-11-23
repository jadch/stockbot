// @flow
const getLastPrice = require('./getLastPrice');

exports.lastPrice = (req :{body:{result:{parameters:{ticker: string}}}}, res: Object) => {
  const { ticker } = req.body.result.parameters;

  getLastPrice(ticker).then((output) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ speech: output, displayText: output }));
  }).catch((error) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ speech: error, displayText: error }));
  });
};
