/* eslint-disable no-console */

const { send } = require('micro');

const fetch = async (req, res) => {
  try {
    send(res, 200, `Your id is ${req.params.fetchById}`);
  } catch (err) {
    console.error('@fetch', err);
    send(res, 500);
  }
};

module.exports = fetch;
