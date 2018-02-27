/* eslint-disable no-console */

const { send } = require('micro');
const Hashids = require('hashids');

const hashids = new Hashids('', 6);
const Url = require('../models/shorten');

function createJsonResponse(url, req, id) {
  return {
    original_url: url,
    short_url: `${req.headers.host}/${hashids.encode(id)}`,
  };
}

const shorten = async (req, res) => {
  const url = req.query.link;
  if (!url) {
    send(res, 400, 'Wrong query parameter');
    return;
  }

  try {
    const foundDoc = await Url.findOne({ url });
    if (foundDoc) {
      const shortUrl = createJsonResponse(url, req, foundDoc.id);

      send(res, 200, shortUrl);
      return;
    }

    const savedDoc = await Url({ url }).save();
    if (savedDoc) {
      const shortUrl = createJsonResponse(url, req, savedDoc.id);

      send(res, 201, shortUrl);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('@shorten', err);
      send(res, 412, `${err.name}: ${err.errors.url.message}`);
      return;
    }
    console.error('@shorten', err);
    send(res, 500, 'Database unavailable');
  }
};

module.exports = shorten;
