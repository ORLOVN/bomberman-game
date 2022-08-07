const { merge } = require("webpack-merge");
const common = require("../webpack.common");
const path = require("path");
const webpack = require("webpack");

const nodeExternals = require('webpack-node-externals');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  target: "node",
  mode: "production",
  entry: path.resolve(__dirname, "../..", "src/components/App/App.tsx"),
  output: {
    path: path.resolve(__dirname, "../..", "dist/server"),
    filename: "app.ssr.bundle.js",
    publicPath: "/",
    libraryTarget: "commonjs2",
    clean: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
    alias: {
      "@": path.resolve(__dirname, "../..", "src"),
      images: path.resolve(__dirname, "../..", "src/assets/images"),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: "null-loader"
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
  externals: [nodeExternals()]
});
