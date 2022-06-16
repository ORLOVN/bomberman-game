const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "www/index.html"),
    }),
  ],
};
