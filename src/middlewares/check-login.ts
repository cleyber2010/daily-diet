import {FastifyReply, FastifyRequest} from "fastify";
import {fastifyCookie} from "@fastify/cookie";

export async function checkLogin(request: FastifyRequest, reply: FastifyReply) {
    if (!request.cookies.userId) {
        return reply.status(401).send({
            "error": "Could not authenticate",
            "status": "Unauthorized",
            "info": "Access the /login route"
        })
    }
}