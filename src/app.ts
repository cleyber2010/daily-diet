import fastify from "fastify";
import {fastifyCookie} from "@fastify/cookie";
import {loginRoutes} from "./routes/loginRoutes";
import {userRoutes} from "./routes/userRoutes";
import {snackRoutes} from "./routes/snackRoutes";
import {metricRoutes} from "./routes/metricRoutes";

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

export default app;