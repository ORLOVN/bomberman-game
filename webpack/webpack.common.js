const path = require("path");
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".scss"],
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
    new DotenvWebpackPlugin(),
  ],
};
