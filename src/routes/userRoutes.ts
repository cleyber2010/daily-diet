import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { knexDb } from "../database";

export async function userRoutes(app: FastifyInstance) {
    app.post('/', (request: FastifyRequest, reply: FastifyReply) => {
        return "Create User";
    });
}