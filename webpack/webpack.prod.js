const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: '[name].[contenthash].js',
  },
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.module\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: false,
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
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module.(s[ac]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
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
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: 'index.html',
      runtimeCaching: [{
        urlPattern: ({_, url}) => url.hostname === 'ya-praktikum.tech',
        handler: "NetworkFirst",
        options: {
          cacheName: 'requests',
        },
      }]
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    })
  ],
});
