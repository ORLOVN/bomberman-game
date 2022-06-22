const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, "..", "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "bundle.js",
    publicPath: '/',
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
      images: path.resolve(__dirname, "..", "src/assets/images"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|json)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "www/index.html"),
    }),
    new DotenvWebpackPlugin(),
  ],
};
