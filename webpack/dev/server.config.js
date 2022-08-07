const { merge } = require("webpack-merge");
const common = require("../webpack.common");
const path = require("path");
const webpack = require("webpack");

const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
  target: "node",
  mode: "development",
  entry: path.resolve(__dirname, '../../server/index.ts'),
  output: {
    path: path.resolve(__dirname, "../..", "dist/server"),
    filename: "server.bundle.js",
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.css$/, loader: 'ignore-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    })
  ],
  externals: [nodeExternals()]
});
