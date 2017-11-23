// @flow
const axios = require('axios');

// Configuring axios
const IEX = axios.create({
  baseURL: 'https://api.iextrading.com/1.0',
});


/**
 * Gets the latest stock price from IEX.
 * @param {string} ticker The stock ticker.
 * @returns {object} The stock object from IEX.
 */
module.exports = function getLastPrice(ticker: string) : Promise <{symbol: string, price: number}> {
  // Creating the path for the axios request
  const path = `/tops/last?symbols=${ticker}`;

  return IEX.get(path).then(response => response.data[0]).catch(error => error);
};
