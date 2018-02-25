/* eslint-disable no-console */

const fs = require('fs');
const { URL } = require('url');
const { send } = require('micro');
const { promisify } = require('util');
const Handlebars = require('handlebars');

const readFileAsync = promisify(fs.readFile);

const home = async (req, res) => {
  try {
    const url = new URL(req.headers.host);

    const source = await readFileAsync('./index.hbs', { encoding: 'utf8' });
    const template = Handlebars.compile(source);
    const result = template({ url });

    send(res, 200, result);
  } catch (err) {
    console.error('@home', err);
    send(res, 500);
  }
};

module.exports = home;
