import {FastifyInstance} from "fastify";

export async function snackRoutes(app: FastifyInstance) {
    app.get('/', (request, reply) => {
        return "Get snacks"
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