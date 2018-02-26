const { router, get } = require('microrouter');

const home = require('./controllers/home');
const shorten = require('./controllers/shorten');
const fetch = require('./controllers/fetch');

module.exports = router(
  get('/', home),
  get('/api', shorten),
  get('/:fetchById', fetch),
);
