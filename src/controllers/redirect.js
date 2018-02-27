/* eslint-disable no-console */

const { send } = require('micro');
const Hashids = require('hashids');

const hashids = new Hashids('', 6);
const Url = require('../models/shorten');
const createHomeView = require('../views/home');

const fetch = async (req, res) => {
  try {
    const { shortId } = req.params;

    const id = hashids.decode(shortId);

    const doc = await Url.findOne({ _id: id[0] });

    if (!doc) {
      send(
        res,
        404,
        await createHomeView(req, {
          error: '404: requested short link not found',
        }),
      );
      return;
    }

    res.writeHead(302, { Location: doc.url });
    res.end();
  } catch (err) {
    console.error('@fetch', err);
    send(
      res,
      500,
      await createHomeView(req, {
        error: '500: something went wrong with redirect',
      }),
    );
  }
};

module.exports = fetch;
