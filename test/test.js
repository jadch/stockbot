const getLastPrice = require('../src/getLastPriceFromIEX');
const formatResponse = require('../src/formatResponseFromIEX');

const assert = require('assert');
const nock = require('nock');

// Setting up nock for the testing of getLastPrice
// first request: normal answer
nock('https://api.iextrading.com')
  .get('/1.0/tops/last?symbols=AAPL')
  .reply(200, [
    {
      symbol: 'AAPL',
      price: 10,
      size: 100,
      time: 150,
    },
  ]);
// second request: IEX API error
nock('https://api.iextrading.com')
  .get('/1.0/tops/last?symbols=AAPL')
  .replyWithError([{ }]);

describe('Testing getLastPrice', () => {
  it('should return an object (not an array of one)', () => getLastPrice('AAPL').then((result) => {
    assert(JSON.stringify(result) === JSON.stringify({
      symbol: 'AAPL',
      price: 10,
      size: 100,
      time: 150,
    }));
  }));
  it('should return a string "error" in case of an error', () => getLastPrice('AAPL').then((result) => {
    assert(result === 'error');
  }));
});


// describe('Testing formatResponseFromIEX function', () => {
//   it('should return a string', () => getLastPrice('AAPL').then((result) => {
//     assert(typeof result === 'string');
//   }));
//   it('should mention requested ticker', () => getLastPrice('AAPL').then((result) => {
//     assert(result.indexOf('AAPL') !== -1);
//   }));
//   it('should return the "sorry" message if IEX has no price', () => getLastPrice('VZSV1SL').then((result) => {
//     assert(result === 'Sorry, for some reason we couldnt get the price from IEX. Try again.');
//   }));
// });
