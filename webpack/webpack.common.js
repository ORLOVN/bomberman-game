const path = require("path");
const DotenvWebpackPlugin = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".scss"],
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
      "images": path.resolve(__dirname, "..", "src/assets/images"),
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
      {
        test: /\.ico$/,
        use: "null-loader"
      },
    ],
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        // relative path is from src
        { from: './www/favicon.ico' },
      ]
    })
  ],
};
