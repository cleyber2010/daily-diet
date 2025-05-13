import {FastifyInstance} from "fastify";
import {checkLogin} from "../middlewares/check-login";
import {knexDb} from "../database";
import { z } from "zod";
import {randomUUID} from "node:crypto";

export async function snackRoutes(app: FastifyInstance) {
    app.addHook('preHandler', checkLogin);

    app.get('/', async (request, reply) => {
        const userId = request.cookies.userId;

        const snacks = await knexDb('snacks').select("*").where({
            'user_id': userId
        });

        return reply.status(200).send({
            snacks
        })
    });

    app.post('/', async (request, reply) => {

        const snackRequestSchema = z.object({
            name: z.string(),
            description: z.string(),
            isInside: z.boolean()
        });

        const { name, description, isInside } = snackRequestSchema.parse(request.body);
        const userId = request.cookies.userId;

        console.log("userId ", userId);

        await knexDb('snacks').insert({
            id: randomUUID(),
            user_id: userId,
            name,
            description,
            isInside,

        });

        return reply.status(201).send({});
    })

    app.get('/:id', async (request, reply) => {
        const userId = request.cookies.userId;

        const snackIdSchema = z.object({
            id: z.string()
        })

        const { id } = snackIdSchema.parse(request.params);

        const snack = await knexDb("snacks").select("*").where({
            id,
            user_id: userId,
        })

        return reply.status(200).send({
            snack
        })
    })

    app.put('/:id', async (request, reply) => {
        const userId = request.cookies.userId;

        const snackIdSchema = z.object({
            id: z.string()
        })
        const snackRequestSchema = z.object({
            name: z.string(),
            description: z.string(),
            isInside: z.boolean()
        })

        const { name, description, isInside } = snackRequestSchema.parse(request.body);
        const { id } = snackIdSchema.parse(request.params);

        await knexDb('snacks').update({
            name,
            description,
            isInside
        }).where({
            id,
            user_id: userId,
        });

        return reply.status(200).send({});
    })

    app.delete('/:id', async (request, reply) => {
        const userId = request.cookies.userId;

        const snackIdSchema = z.object({
            id: z.string()
        })

        const { id } = snackIdSchema.parse(request.params);

        await knexDb('snacks').where({
            id,
            user_id: userId,
        }).del();

        return reply.status(204).send({});
    })
}