import {FastifyInstance} from "fastify";
import {knexDb} from "../database";

export async function snackRoutes(app: FastifyInstance) {
    app.get('/', async (request, reply) => {
        return knexDb('sqlite_schema').select("*")
    });

    app.post('/', (request, reply) => {

    })

    app.get('/:id', (request, reply) => {

    })

    app.put('/:id', (request, reply) => {

    })

    app.delete('/:id', (request, reply) => {

    })
}