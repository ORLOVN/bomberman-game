import { IncomingMessage } from "http";
import express from "express";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import { sequelize } from "./database";
import middleware from "../ssr";
import router from "./router/router";
import { SiteTheme } from "./db/models/site-theme";
import { ETheme } from "./db/models/enum";

const app = express();

app.use(
  `${process.env.PROXY_API_PATH}`,
  createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^${process.env.PROXY_API_PATH}`]: "",
    },
    onProxyRes: (proxyRes: IncomingMessage, req: any) => {
      if (proxyRes.headers["set-cookie"]) {
        proxyRes.headers["set-cookie"] = proxyRes.headers["set-cookie"].map(
          (e) => {
            let processed = e.replace(
              /Domain\s*=\s*[\w\-._:]+\s*;/gim,
              `Domain=${req.hostname};`
            );
            if (process.env.PROXY_COOKIE_SECURE !== "1") {
              processed = processed
                .replace(/secure\s*;/gim, "")
                .replace(/SameSite\s*=\s*None\s*;?/gim, "");
            }
            return processed;
          }
        );
      }
    },
  })
);

app.use(express.static(__dirname, { index: false }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(router);

app.get("/*", middleware);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ force: true });

    console.log("Connection has been established successfully.");

    await SiteTheme.bulkCreate([
      {
        theme: ETheme.LIGHT,
      },
      {
        theme: ETheme.DARK,
      },
    ]);

    app.listen(PORT, () => {
      console.log(`Listening on ${process.env.PORT}...`);
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();
