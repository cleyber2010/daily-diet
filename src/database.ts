import knex, { Knex } from 'knex';
import env from "./utils/envConfig";

export const optionsKnex: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: {
        filename: env.DATABASE_PATH
    },
    useNullAsDefault: true,
    migrations: {
        directory: env.MIGRATIONS_PATH,
        extension: env.MIGRATIONS_EXT
    }
}

export const knexDb = knex(optionsKnex);