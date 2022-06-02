const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
