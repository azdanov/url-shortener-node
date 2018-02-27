/* eslint-disable no-console */

const { send } = require('micro');
const createHomeView = require('../views/home');

const home = async (req, res) => {
  try {
    const homeView = await createHomeView(req);

    send(res, 200, homeView);
  } catch (err) {
    console.error('@home', err);
    send(
      res,
      500,
      await createHomeView(req, {
        error: '500: something went wrong with home',
      }),
    );
  }
};

module.exports = home;
