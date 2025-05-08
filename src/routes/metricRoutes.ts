import {FastifyInstance} from "fastify";

export async function metricRoutes(app: FastifyInstance) {
    app.get('/', (request, reply) => {
        return 'Get metrics'
    })
}