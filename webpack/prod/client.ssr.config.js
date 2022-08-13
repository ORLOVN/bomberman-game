const { merge } = require("webpack-merge");
const common = require("../webpack.common");
const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
require('dotenv').config();
const host = process.env.HOST;
function urlComparison({_, url}) {
  console.log(host);
  return url.hostname === new URL(host).hostname
};

module.exports = merge(common, {
  target: "web",
  mode: "production",
  entry: path.resolve(__dirname, "../../", "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../..", "dist/server"),
    filename: "[name].[contenthash].js",
    publicPath: '/'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
    alias: {
      "@": path.resolve(__dirname, "../..", "src"),
      images: path.resolve(__dirname, "../..", "src/assets/images"),
    },
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../..", "www/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: 'index.html',
      runtimeCaching: [{
        urlPattern: urlComparison,
        handler: "NetworkFirst",
        options: {
          cacheName: 'requests',
        },
      }]
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    })
  ]
});
