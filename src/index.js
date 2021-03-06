const { router, get } = require('microrouter');
const home = require('./controllers/home');
const shorten = require('./controllers/shorten');
const result = require('./controllers/result');
const redirect = require('./controllers/redirect');
const connect = require('./database');

connect();

module.exports = router(
  get('/', home),
  get('/api', shorten),
  get('/result', result),
  get('/:shortId', redirect),
);
