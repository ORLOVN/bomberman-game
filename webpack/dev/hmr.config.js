const { merge } = require("webpack-merge");
const common = require("../webpack.common");
const path = require("path");
const webpack = require("webpack");

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypescript = require('react-refresh-typescript');

module.exports = merge(common, {
  target: "web",
  mode: "development",
  devtool: "inline-source-map",
  entry: [
    '@gatsbyjs/webpack-hot-middleware/client?path=/__webpack_hmr',
    path.resolve(__dirname, "../..", "src/index.tsx"),
  ],
  output: {
    path: path.resolve(__dirname, "../..", "dist/server"),
    filename: "hmr.[hash].bundle.js",
    publicPath: "/",
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
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
            getCustomTransformers: () => ({
                before: [ReactRefreshTypescript()]
            }),
            transpileOnly: true
        }
      },
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
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin({
      overlay: {
        sockIntegration: "whm"
      }
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
});
