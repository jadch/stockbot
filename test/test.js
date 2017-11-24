const getLastPrice = require('../src/getLastPriceFromIEX');
const formatResponse = require('../src/formatResponseFromIEX');
// const lastPrice = require('../src/index');

const assert = require('assert');
const nock = require('nock');
const axios = require('axios');
const sinon = require('sinon');
// const request = require('request');

// ***********************
//      FUNCTION TESTS
// ***********************
// Setting up nock for the testing of getLastPrice
// 1) normal answer
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
// 2) IEX API error
nock('https://api.iextrading.com')
  .get('/1.0/tops/last?symbols=AAPL')
  .replyWithError([{ }]);

// Function tests
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
    assert(formatResponse(argument) === 'The latest AAPL price on IEX is $10');
  });
  it('should format correctly error messages', () => {
    const argument = 'error';
    const expectedReply = 'Sorry, for some reason we couldnt get the price from IEX. Try again.';
    assert(formatResponse(argument) === expectedReply);
  });
});

// ***********************
//      API TEST
// ***********************
// Configuring axios
const IEX = axios.create({
  baseURL: 'https://api.iextrading.com',
});

describe('Testing that IEX API behaves as expected', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return an array of one object with 4 known keys', () => IEX.get('/1.0/tops/last?symbols=FB').then((result) => {
    const keys = Object.keys(result.data[0]);
    assert.deepEqual(keys, ['symbol', 'price', 'size', 'time']);
  }));
  it('price key should be of-type number', () => IEX.get('/1.0/tops/last?symbols=FB').then((result) => {
    const stock = result.data[0];
    assert(typeof stock.price === 'number');
  }));
  it('symbol key should be of-type string', () => IEX.get('/1.0/tops/last?symbols=FB').then((result) => {
    const stock = result.data[0];
    assert(typeof stock.symbol === 'string');
  }));
  it('should handle errors as expected', () => IEX.get('/1.0/tops/last?symbols=FBBBSHKZ').then((result) => {
    assert.deepEqual(result.data, [{}]);
  }));
});

// ***********************
//      index.js TEST
// ***********************
const obj = {};
obj.sum = function sum(a, b) {
  return a + b;
};

describe('Testing index.js', () => {
  beforeEach(() => {
    sinon.stub(obj, 'sum').returns(4);
  });

  it('testing sinon', () => {
    assert(obj.sum(2, 1) === 4);
  });
});

describe('Testing Sinon 2', () => {

});
