const jsonfile = require('jsonfile');
const axios = require('axios');

/**
 * Gets all listed stocks on IEX.
 * @returns {JSON} A JSON file, consisting of an array of stock objects
 *  { symbol, name, date, isEnabled, type, iexId }
 *  All attributes are strings except isEnabled. Consult IEX documentation for more info.
 */
function getAllListedStocksOnIEX() {
  const IEX = axios.create({
    baseURL: 'https://api.iextrading.com/1.0/ref-data/symbols',
  });
  return IEX.get().then(response => response.data).catch(error => error);
}

/**
 * Formats stock names for Dialogflow (Want the bot to recognize 'Apple' or 'Microsoft',
 * not 'Apple Inc.' and 'Microsoft Corporation').
 * @param {string} name The stock name as given by IEX.
 * @returns {string} The formatted stock name, with no brackets.
 */
function format(name) {
  return name.slice(0, name.indexOf(' '));
}


const file = 'ticker.json';
const ticker = {
  id: '14ca9f47-3726-481b-a213-876f889ef9ed',
  name: 'ticker',
  isOverridable: true,
  entries: [],
  isEnum: false,
  automatedExpansion: false,
}; // Ticker entity with corresponding entity ID and config from Dialogflow

// Populating the 'ticker.json' file with a JSON object describing the Dialogflow entity.
// The JSON object will be exactly like 'ticker', but with a populated 'entries' array.
// Each object in the array will follow the format:
// { "value": "AAPL", "synonyms": ["AAPL", "Apple Inc."] }
getAllListedStocksOnIEX().then((response) => {
  const entries = [];
  response.forEach((stock) => {
    // For some reason, IEX returns around 3 unkown stocks with '^' as a ticker
    if (stock.symbol.indexOf('^') === -1) {
      entries.push({
        value: stock.symbol,
        synonyms: [
          stock.symbol,
          format(stock.name),
        ],
      });
    }
  });
  ticker.entries = entries;
  jsonfile.writeFile(file, ticker, err => err);
  console.log(`Done, added ${ticker.entries.length} stocks`);
});
