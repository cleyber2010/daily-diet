import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { knexDb } from "../database";
import { z } from "zod";
import {randomUUID} from "node:crypto";
import {checkLogin} from "../middlewares/check-login";
import {fastifyCookie} from "@fastify/cookie";

export async function userRoutes(app: FastifyInstance) {

    app.addHook('preHandler', checkLogin);

    app.get('/', async (request, reply) => {
        const users = await knexDb("users").select("*");

        return reply.status(200).send({
            users
        })
    })

    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        const userRequestSchema = z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string()
        });

        const { firstName, lastName, email } = userRequestSchema.parse(request.body);

        await knexDb('users').insert({
            id: randomUUID(),
            firstName,
            lastName,
            email
        });

        return reply.status(201).send({});
    });
}