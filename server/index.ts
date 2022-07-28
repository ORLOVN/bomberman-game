import express from 'express';

import middleware from '../ssr';

const app = express();

app.use(express.static(__dirname));

app.get('/*', middleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port ${PORT}...`);
});
