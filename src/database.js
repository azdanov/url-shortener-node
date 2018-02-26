const mongoose = require('mongoose');

const url = `mongodb://localhost/test`;

const connectWithDB = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(url).catch(err => {
    throw new Error(`Database connectivity problem${err.message}`);
  });
};

module.exports = connectWithDB;
