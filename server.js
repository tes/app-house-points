const express = require('express');
const session =require('express-session');
const path = require('path');
const compress = require('compression');
const api = require('./lib/middleware/api');
const auth = require('./lib/middleware/auth');
const error = require('./lib/middleware/error');
const buildFolder = path.resolve(__dirname, 'build');
const PORT = 3001;

const app = express();
app.set('etag', false);
app.set('x-powered-by', false);
app.use(compress());
app.use(express.static(buildFolder));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}))

app.get('/api/user', api.getUser);
app.get('/api/login', auth.ensureAuthorised, api.login);
app.get('/api/schools/:schoolId', auth.ensureAuthorised, auth.hasEntitlement('House Points'), api.getSchool);
app.post('/api/points/:schoolId/:houseId', auth.ensureAuthorised, auth.hasEntitlement('House Points'), api.addHousePoint);
app.delete('/api/points/:schoolId/:houseId', auth.ensureAuthorised, auth.hasEntitlement('House Points'), api.subtractHousePoint);
app.get('/cb', auth.callback);
app.use(error.notFound);
app.use(error.internalServerError);

app.use('*', function (req, res, next) {
  res.set('content-type', 'text/html');
  res.sendFile(buildFolder + '/index.html');
});

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:' + PORT);
})

module.exports = app
