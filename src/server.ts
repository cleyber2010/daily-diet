import fastify from 'fastify';
import { knexDb } from './database'

const app = fastify();

app.get('/users', async () => {
    return knexDb('sqlite_schema').select("*")
});

app.listen({
    port:8080
}).then( () => {
    console.log('server started on port 8080');
});