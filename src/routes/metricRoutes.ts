import {FastifyInstance} from "fastify";
import {checkLogin} from "../middlewares/check-login";

export async function metricRoutes(app: FastifyInstance) {


    app.addHook('preHandler', checkLogin);

    app.get('/', (request, reply) => {
        return 'Get metrics'
    })
}