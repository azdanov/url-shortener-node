# Url Shortener Node

Url Shortener microservice made in node for freeCodeCamp

[Live version](https://url-shortener-node-ccqihrxkwo.now.sh/)

Based on [Micro](https://github.com/zeit/micro) http microservice
ecosystem and deployed on [Now](https://zeit.co/now).

[Handlebars](https://github.com/wycats/handlebars.js) is used for templating,
[Validator](https://github.com/chriso/validator.js/) for URL verification,
[Mongoose](https://github.com/Automattic/mongoose) and [mLab](https://mlab.com/) for
helping with MongoDB, and [Hashids](https://github.com/ivanakimov/hashids.js) for unique id generation.

---

## Usage

Yarn or Npm can be used to run the commands.

`yarn dev` to start micro-dev for development.

`yarn debug` to debug micro-dev instance by using [node --inspect](https://nodejs.org/en/docs/inspector/).

`yarn start` to serve public directory via micro.

`yarn lint` to lint code using eslint and format with prettier.

## Development

Latest Node.js is required.

Husky and lint-staged are used to keep code consistent by running tests
and linting.

## License

[MIT](LICENSE)
