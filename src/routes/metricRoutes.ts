import {FastifyInstance} from "fastify";
import {checkLogin} from "../middlewares/check-login";
import {knexDb} from "../database";

export async function metricRoutes(app: FastifyInstance) {


    app.addHook('preHandler', checkLogin);

    app.get('/', async (request, reply) => {

        const { userId } = request.cookies;

        const { total } = await knexDb('snacks').where({
            user_id : userId,
        }).count('id', { as: 'total'}).first();

        const { dietTotal } = await knexDb('snacks').where({
            user_id : userId,
            isInside: true
        }).count('id', { as: 'dietTotal' }).first();

        const { notDiet } = await knexDb('snacks').where({
            user_id : userId,
            isInside: false
        }).count('id', { as: 'notDiet' }).first();

        const sequenceDiet = await knexDb('snacks').where({
            user_id : userId,
        }).select('isInside');

        let sequenceCount = 0;
        let bestSequel = 0;

        sequenceDiet.forEach( item => {
            if (item.isInside) {
                sequenceCount++;
            } else {
                if (sequenceCount > bestSequel) {
                    bestSequel = sequenceCount;
                    sequenceCount = 0;
                }
            }
        })

        return reply.status(200).send({
            totalSnacks: total,
            withinTheDiet: dietTotal,
            offTheDiet: notDiet,
            bestSequel: bestSequel
        });
    })
}