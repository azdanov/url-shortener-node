/* eslint-disable no-console */

const { send } = require('micro');
const createHomeView = require('../views/home');

const home = async (req, res) => {
  try {
    const homeView = await createHomeView(req);

    send(res, 200, homeView);
  } catch (err) {
    console.error('@home', err);
    send(res, 500);
  }
};

module.exports = home;
