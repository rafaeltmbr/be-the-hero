import knex from 'knex';
import configuration from '../../knexfile';

const configs = {
  development: configuration.development,
  test: configuration.test,
  staging: configuration.staging,
  production: configuration.production,
};

const databaseConfig = configs[process.env.NODE_ENV] || configuration.development;

const connection = knex(databaseConfig);

export default connection;
