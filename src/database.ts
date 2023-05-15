import Knex from 'knex';
import knexFile from './knexfile';
import { Model } from 'objection';

const initDatabase = async () => {
    const db = await Knex(knexFile.development);
    Model.knex(db);

    return db;
}

// TODO wait for success connection

export default initDatabase;
