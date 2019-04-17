const express = require('express');
const path = require('path');
const compress = require('compression');

const buildFolder = path.resolve(__dirname, 'build');
const PORT = 3000;

const app = express();
app.use(compress());
app.use(express.static(buildFolder));

app.use('*', function (req, res, next) {
  res.set('content-type', 'text/html');
  res.sendfile(buildFolder + '/index.html');
});

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:' + PORT);
})

module.exports = app
