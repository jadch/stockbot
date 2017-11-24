// @flow

/**
 * Formats the response from IEX
 * @param {object} stock The stock object from IEX.
 * @returns {string} A message indicating the latest stock price, or an error if no price.
 */
module.exports = function formatResponse(stock: {
  symbol: string,
  price: number
}) : string {
  // Checking if the price exists
  if (stock === 'error') return 'Sorry, for some reason we couldnt get the price from IEX. Try again.';

  const message = `The latest ${stock.symbol} price on IEX is $${stock.price}`;
  return message;
};
