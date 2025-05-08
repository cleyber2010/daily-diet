import fastify from 'fastify';
import {userRoutes} from "./routes/userRoutes";
import {snackRoutes} from "./routes/snackRoutes";
import {metricRoutes} from "./routes/metricRoutes";

const app = fastify();

app.register(userRoutes, {
    prefix: 'users'
});
app.register(snackRoutes, {
    prefix: 'snacks'
})
app.register(metricRoutes, {
    prefix: 'metrics'
});

app.listen({
    port:8080
}).then( () => {
    console.log('server started on port 8080');
});