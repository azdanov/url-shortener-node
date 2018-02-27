/* eslint-disable no-underscore-dangle,no-shadow */

const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

let Counter;

// Make sure only one model exists
try {
  Counter = mongoose.model('counter');
} catch (err) {
  Counter = mongoose.model('counter', CounterSchema);
}

const UrlSchema = new Schema(
  {
    _id: Number,
    url: {
      type: String,
      lowercase: true,
      unique: true,
      validate: {
        validator(url) {
          return validator.isURL(url);
        },
        message: '{VALUE} is not a valid url',
      },
    },
  },
  { timestamps: true },
);

UrlSchema.pre('save', function save(next) {
  Counter.findByIdAndUpdate(
    { _id: 'url_count' },
    { $inc: { seq: 1 } },
    (error, counter) => {
      if (error) {
        next(error);
        return;
      }
      this._id = counter.seq;
      next();
    },
  );
});

let Url;

// Make sure only one model exists
try {
  Url = mongoose.model('Url');
} catch (e) {
  Url = mongoose.model('Url', UrlSchema);
}

module.exports = Url;
