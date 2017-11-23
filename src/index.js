// @flow
const getLastPrice = require('./getLastPriceFromIEX');
const formatResponse = require('./formatResponseFromIEX');

exports.lastPrice = (req :{body:{result:{parameters:{ticker: string}}}}, res: Object) => {
  const { ticker } = req.body.result.parameters;

  getLastPrice(ticker).then((response) => {
    const output = formatResponse(response);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ speech: output, displayText: output }));
  }).catch((error) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ speech: error, displayText: error }));
  });
};
