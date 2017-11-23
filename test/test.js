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


// ****************
//      TESTS
// ****************
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


describe('Testing formatResponse', () => {
  it('should format correctly response', () => {
    const argument = {
      symbol: 'AAPL',
      price: 10,
      size: 100,
      time: 150,
    };
    assert(formatResponse(argument) === 'The latest AAPL price on IEX is 10');
  });
  it('should format correctly error messages', () => {
    const argument = 'error';
    const expectedReply = 'Sorry, for some reason we couldnt get the price from IEX. Try again.';
    assert(formatResponse(argument) === expectedReply);
  });
});
