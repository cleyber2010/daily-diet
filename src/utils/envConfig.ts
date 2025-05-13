import { config } from "dotenv";
import { z } from 'zod';

if (process.env.NODE_ENV === 'test') {
    config({
        path: './.env.test',
    });
} else {
    config();
}

const envSchema = z.object({
    PORT: z.coerce.number(),
    DATABASE_CLIENT: z.string(),
    DATABASE_PATH: z.string(),
    MIGRATIONS_PATH: z.string(),
    MIGRATIONS_EXT: z.string(),
});

const env =  envSchema.parse(process.env);

export default env;