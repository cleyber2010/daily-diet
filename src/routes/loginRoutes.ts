import {FastifyInstance} from "fastify";
import { z } from "zod";
import {knexDb} from "../database";

export async function loginRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const loginRequestSchema = z.object({
            email: z.string().email(),
            password: z.string()
        });

        const { email, password } = loginRequestSchema.parse(request.body);

        const verifyLogin = await knexDb('users').where({
            email: email,
            password: password
        }).select('id').first();

        if (verifyLogin) {
            const { id } = verifyLogin;

            if (request.cookies.userId) {
                return reply.status(200).send({
                    status: "success",
                })
            }

            return reply.setCookie('userId', id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            }).status(200).send({
                status: "User logged in",
            });
        }

        return reply.status(401).send({
            error: 'Unauthorized'
        });
    })
}