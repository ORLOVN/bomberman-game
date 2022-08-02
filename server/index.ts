import express from 'express';
import middleware from '../ssr';

const proxy = require('express-http-proxy');

const app = express();

app.use('/yandex-api', proxy('ya-praktikum.tech',{
  proxyReqPathResolver: (req: Request) => `/api/v2${req.url}`
}));

app.use(express.static(__dirname));

app.get('/*', middleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port ${PORT}...`);
});


