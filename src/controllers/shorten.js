/* eslint-disable no-console */

const { send } = require('micro');
const Hashids = require('hashids');

const Url = require('../models/shorten');
const createHomeView = require('../views/home');

const hashids = new Hashids('', 6);

function createErrorResponse(req, message) {
  return createHomeView(req, { error: message });
}

const shorten = async (req, res) => {
  const url = decodeURI(req.query.link);
  if (!url) {
    send(res, 400, await createErrorResponse(req, 'Invalid query parameter'));
    return;
  }

  try {
    const foundDoc = await Url.findOne({ url });
    if (foundDoc) {
      res.writeHead(302, {
        Location: `/result?q=${hashids.encode(foundDoc.id)}&u=${encodeURI(
          foundDoc.url,
        )}`,
      });
      res.end();
    }

    const savedDoc = await Url({ url }).save();
    if (savedDoc) {
      res.writeHead(302, {
        Location: `/result?q=${hashids.encode(savedDoc.id)}&u=${encodeURI(
          savedDoc.url,
        )}`,
      });
      res.end();
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('@shorten', err);
      send(res, 412, await createErrorResponse(req, `${err.message}`));
      return;
    }
    console.error('@shorten', err);
    send(res, 500, await createErrorResponse(req, '500: database unavailable'));
  }
};

module.exports = shorten;
