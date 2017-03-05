'use strict';

var webpack = require('webpack');
var config = require('./webpack.config.base.js');

if (process.env.NODE_ENV !== 'test') {
  config.entry = [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/dev-server'
  ].concat(config.entry);
}

config.devtool = '#cheap-module-eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
]);

config.module.loaders = config.module.loaders.concat([
  {
      test: /\.jsx?$/,
      loaders: [ 'react-hot', 'babel?presets[]=es2015&presets[]=react&presets[]=stage-0'],
      exclude: /node_modules/
  }
]);

module.exports = config;
