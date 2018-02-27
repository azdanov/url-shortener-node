/* eslint-disable no-console */

const { send } = require('micro');
const Hashids = require('hashids');

const hashids = new Hashids('', 6);
const Url = require('../models/shorten');
const createHomeView = require('../views/home');

function createJsonResponse(url, req, id) {
  return {
    original_url: url,
    short_url: `${req.headers.host}/${hashids.encode(id)}`,
  };
}

function createResponse(url, req, foundDoc) {
  const shortUrl = createJsonResponse(url, req, foundDoc.id);
  return createHomeView(req, shortUrl);
}

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
      const responsePage = await createResponse(url, req, foundDoc);
      send(res, 200, responsePage);
      return;
    }

    const savedDoc = await Url({ url }).save();
    if (savedDoc) {
      const responsePage = await createResponse(url, req, savedDoc);
      send(res, 201, responsePage);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('@shorten', err);
      send(
        res,
        412,
        await createErrorResponse(req, `412: ${err.errors.url.message}`),
      );
      return;
    }
    console.error('@shorten', err);
    send(res, 500, await createErrorResponse(req, '500: database unavailable'));
  }
};

module.exports = shorten;
