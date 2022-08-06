import {IncomingMessage} from "http";
import express from 'express';
import middleware from '../ssr';

const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();

app.use(`${process.env.PROXY_API_PATH}`, createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^${process.env.PROXY_API_PATH}`] : '',
    },
    onProxyRes: (proxyRes: IncomingMessage, req: any) => {
      if (proxyRes.headers["set-cookie"]) {
        proxyRes.headers["set-cookie"] = proxyRes.headers["set-cookie"].map((e) => {
          let processed = e.replace(/Domain\s*=\s*[\w\-._:]+\s*;/gmi, `Domain=${req.hostname};`);
          if (process.env.PROXY_COOKIE_SECURE !== '1') {
            processed = processed
              .replace(/secure\s*;/gmi, "")
              .replace(/SameSite\s*=\s*None\s*;?/gmi, "")
          }
          return processed;
        })
      }
    },
  })
);

app.use(express.static(__dirname));

app.get('/*', middleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port ${PORT}...`);
});


