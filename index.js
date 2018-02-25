const { send } = require('micro');
const { router, get } = require('microrouter');

const home = require('./lib/home');

const shorten = (req, res) =>
  send(res, 200, `You've submitted ${req.params.linkToShorten}`);

const fetch = (req, res) =>
  send(res, 200, `Your id is ${req.params.fetchById}`);

module.exports = router(
  get('/', home),
  get('/api/:linkToShorten', shorten),
  get('/:fetchById', fetch),
);
