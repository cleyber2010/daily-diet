import knex, { Knex } from 'knex';
import 'dotenv/config';

export const optionsKnex: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: './database/app.db'
    },
    useNullAsDefault: true,
    migrations: {
        directory: './database/migrations/',
        extension: 'ts'
    }
}

export const knexDb = knex(optionsKnex);