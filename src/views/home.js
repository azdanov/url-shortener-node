const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Handlebars = require('handlebars');

const readFileAsync = promisify(fs.readFile);

module.exports = async function createHomeView(req, payload = {}) {
  const source = await readFileAsync(
    path.resolve(__dirname, 'templates', 'home.hbs'),
    { encoding: 'utf8' },
  );
  const template = Handlebars.compile(source);
  return template({
    root_url: req.headers.host,
    original_url: payload.original_url,
    short_url: payload.short_url,
    error: payload.error,
  });
};
