const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "..", "dist"),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.module\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module.(s[ac]ss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    })
  ],
});
