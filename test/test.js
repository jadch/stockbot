const getLastPrice = require('../src/getLastPriceFromIEX');

const assert = require('assert');

describe('Testing getLastPrice function', () => {
  it('should return a string', () => getLastPrice('AAPL').then((result) => {
    assert(typeof result === 'string');
  }));
  it('should mention requested ticker', () => getLastPrice('AAPL').then((result) => {
    assert(result.indexOf('AAPL') !== -1);
  }));
  it('should return the "sorry" message if IEX has no price', () => getLastPrice('VZSV1SL').then((result) => {
    assert(result === 'Sorry, for some reason we couldnt get the price from IEX. Try again.');
  }));
});
