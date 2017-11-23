const axios = require('axios');

// Configuring axios
const IEX = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
});

/**
 * Gets the latest stock price on IEX
 * @param {string} ticker The first number.
 * @returns {string} A message indicating the latest stock price
 */
module.exports = function getLastPrice(ticker) {
  // Creating the path for the axios request
  const path = `/tops/last?symbols=${ticker}`;

  return IEX.get(path).then(response => {
    const message = `Yo the price is ${response.data[0].price}`;
    return message;
  }).catch(() => 'Sorry, for some reason we couldnt get the price from IEX. Try again.');
};