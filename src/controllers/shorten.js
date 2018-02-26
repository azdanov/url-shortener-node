/* eslint-disable no-console,no-underscore-dangle */

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
  try {
    const url = req.query.link;
    if (!url) {
      send(res, 400, 'Wrong query parameter');
      return;
    }

    const foundDoc = await Url.findOne({ url });
    if (foundDoc) {
      const shortUrl = createJsonResponse(url, req, foundDoc._id);

      send(res, 200, shortUrl);
      return;
    }

    const savedDoc = await Url({ url }).save();
    if (savedDoc) {
      const shortUrl = createJsonResponse(url, req, savedDoc._id);

      send(res, 201, shortUrl);
    }
  } catch (err) {
    console.error('@shorten', err);
    send(res, 500, 'Database unavailable');
  }
};

module.exports = shorten;
