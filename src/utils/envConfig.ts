import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number(),
    DATABASE_CLIENT: z.string(),
    DATABASE_PATH: z.string(),
    MIGRATIONS_PATH: z.string(),
    MIGRATIONS_EXT: z.string(),
});

const env =  envSchema.parse(process.env);

export default env;