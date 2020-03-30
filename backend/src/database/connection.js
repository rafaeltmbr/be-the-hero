const knex = require('knex');
const configuration = require('../../knexfile');

const configs = {
  development: configuration.development,
  test: configuration.test,
  staging: configuration.staging,
  production: configuration.production,
};

const databaseConfig = configs[process.env.NODE_ENV] || configuration.development;

const connection = knex(databaseConfig);

module.exports = connection;
