const express = require('express');
const path = require('path');
const compress = require('compression');
const middleware = require('./lib/middleware');

const buildFolder = path.resolve(__dirname, 'build');
const PORT = 3001;

const app = express();
app.set('etag', false);
app.set('x-powered-by', false);
app.use(compress());
app.use(express.static(buildFolder));

app.get('/api/schools/:schoolId', middleware.getSchool);

app.post('/api/points/:schoolId/:houseId', middleware.addHousePoint);

app.delete('/api/points/:schoolId/:houseId', middleware.subtractHousePoint);

app.use('*', function (req, res, next) {
  res.set('content-type', 'text/html');
  res.sendFile(buildFolder + '/index.html');
});

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:' + PORT);
})

module.exports = app
