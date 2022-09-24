import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "@gatsbyjs/webpack-hot-middleware";

import ssrMiddleware from "./ssrMiddleware";

const config = require("../../webpack/dev/hmr.config");

const compiler = webpack({
  ...config,
});

export default [
  webpackDevMiddleware(compiler, {
    serverSideRender: true,
    index: false,
  }),
  webpackHotMiddleware(compiler, {
    path: "/__webpack_hmr",
  }),
  ssrMiddleware,
];
