var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders:[
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' },
      { test: /\.js$/, exclude:/node_modules/, loader: 'babel-loader'},
    ]
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://127.0.0.1:8080',browser:'chrome' })
  ]
};