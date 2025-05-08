import fastify from 'fastify';
import {userRoutes} from "./routes/userRoutes";
import {snackRoutes} from "./routes/snackRoutes";
import {metricRoutes} from "./routes/metricRoutes";
import {loginRoutes} from "./routes/loginRoutes";
import {fastifyCookie} from "@fastify/cookie";

const app = fastify();
app.register(fastifyCookie);
app.register(loginRoutes, {
    prefix: 'login'
});

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