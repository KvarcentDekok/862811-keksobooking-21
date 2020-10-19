const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/data.js",
    "./js/form.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/move.js",
    "./js/main.js"
  ],
  devtool: false,
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js",
    iife: true
  }
};
