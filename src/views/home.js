const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Handlebars = require('handlebars');
const { URL } = require('url');

const readFileAsync = promisify(fs.readFile);

module.exports = async function createHomeView(req) {
  const source = await readFileAsync(
    path.resolve(__dirname, 'templates', 'home.hbs'),
    { encoding: 'utf8' },
  );
  const template = Handlebars.compile(source);
  const url = new URL(req.headers.host);
  return template({ rootUrl: url });
};
