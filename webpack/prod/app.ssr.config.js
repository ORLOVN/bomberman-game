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
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
  externals: [nodeExternals()]
});
