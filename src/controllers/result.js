/* eslint-disable no-console */

const { send } = require('micro');

const createHomeView = require('../views/home');

function createJsonResponse(originalUrl, shortUrl) {
  return {
    original_url: originalUrl,
    short_url: shortUrl,
  };
}

function createResponse(req, originalUrl, shortUrl) {
  const jsonUrl = createJsonResponse(originalUrl, shortUrl);
  return createHomeView(req, jsonUrl);
}

const home = async (req, res) => {
  const shortUrl = decodeURI(req.query.q);
  const originalUrl = decodeURI(req.query.u);

  try {
    const homeView = await createResponse(req, originalUrl, shortUrl);

    send(res, 200, homeView);
  } catch (err) {
    console.error('@home', err);
    send(
      res,
      500,
      await createHomeView(req, {
        error: '500: something went wrong with result',
      }),
    );
  }
};

module.exports = home;
