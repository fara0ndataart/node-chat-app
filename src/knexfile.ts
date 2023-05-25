import type { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: 'postgres',
      password: '1337',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: 'migrations',
    },
    seeds: {
      directory: 'seeds',
    },
    ...knexSnakeCaseMappers,
  },
};



export default config;
