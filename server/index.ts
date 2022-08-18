import {IncomingMessage} from "http";
import express from "express";
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from "http-proxy-middleware";
import { IncomingMessage } from "http";
import { sequelize } from "./database";
import middleware from "../ssr";
import router from "./router/router";
import { SiteTheme } from "./db/models/site-theme";
import {ETheme} from './db/models/enum';

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
          let processed = e.replace(/Domain\s*=\s*[\w\-._:]+\s*;/gmi, `Domain=${
            new URL(process.env.HOST || req.origin).hostname
          };`);
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

// @ts-ignore
globalThis.url_location  = `http://localhost:${process.env.PORT}`;

app.use(`${process.env.PROXY_API_PATH}`, createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^${process.env.PROXY_API_PATH}`] : '',
    },
    onProxyRes: (proxyRes: IncomingMessage, req: any) => {
      if (proxyRes.headers["set-cookie"]) {
        proxyRes.headers["set-cookie"] = proxyRes.headers["set-cookie"].map((e) => {
          let processed = e.replace(/Domain\s*=\s*[\w\-._:]+\s*;/gmi, `Domain=${
            req.hostname
          };`);
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


app.use(express.static(__dirname, {index: false}));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));


app.use(cookieParser());

app.use(router);

app.get('/*', middleware);

const PORT = process.env.PORT || 3000;

(async () =>{
  try {
    await sequelize.sync({ force: true });

    console.log("Connection has been established successfully.");

    await SiteTheme.bulkCreate([
      {
        theme: ETheme.LIGHT
      },
      {
        theme: ETheme.DARK
      }
    ]);

    app.listen(PORT, () => {
      console.log(`Listening on ${process.env.HOST}...`);
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})()


