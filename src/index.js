const { router, get } = require('microrouter');
const home = require('./controllers/home');
const shorten = require('./controllers/shorten');
const fetch = require('./controllers/fetch');
const connect = require('./database');

connect();

module.exports = router(
  get('/', home),
  get('/shorten', shorten),
  get('/:fetchById', fetch),
);
