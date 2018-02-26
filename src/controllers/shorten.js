/* eslint-disable no-console */

const { send } = require('micro');

const shorten = async (req, res) => {
  try {
    send(res, 200, `You've submitted ${JSON.stringify(req.query)}`);
  } catch (err) {
    console.error('@shorten', err);
    send(res, 500);
  }
};

module.exports = shorten;
