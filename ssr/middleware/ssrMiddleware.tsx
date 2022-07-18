import React from 'react';
import { Request, Response } from "express";

import { renderToString } from 'react-dom/server';

import { StaticRouter } from "react-router-dom/server";

import fs from 'fs';
import path from 'path';

import { Provider } from 'react-redux';
import createStore from '@/store';

const ssrMiddleware = (req: Request, res: Response) => {
  let scriptBundleName = '';

  if (process.env.NODE_ENV === 'development') {
    const { devMiddleware } = res.locals.webpack;
    const jsonWebpackStats = devMiddleware.stats.toJson();
    const { assetsByChunkName } = jsonWebpackStats;
    const [ firstChunkName ] = assetsByChunkName.main;
    scriptBundleName = firstChunkName;
  }

  const location = req.url;

  const indexHTML = fs.readFileSync(
    path.resolve(
      __dirname,
      process.env.NODE_ENV === 'development'
        ? "../../www/index.html"
        : "./index.html"
    ),
    {
      encoding: 'utf-8'
    }
  );

  const store = createStore();

  delete require.cache[
    require.resolve("../../dist/server/app.ssr.bundle.js")
  ];

  // eslint-disable-next-line
  const App = require("../../dist/server/app.ssr.bundle.js").default;

  const reactHTML = renderToString(
    <Provider store={store}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const result = indexHTML.replace(
    '<div id="root"></div>',
    `
      <div id="root">${reactHTML}</div>
      ${scriptBundleName
          ? `<script defer="defer" src="${scriptBundleName}"></script>`
          : ''
      }
    `
  );

  res.send(result);
};

export default ssrMiddleware;
