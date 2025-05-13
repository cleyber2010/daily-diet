import app from "./app";
import env from "./utils/envConfig";

app.listen({
    port:env.PORT,
}).then( () => {
    console.log('server started on port 8080');
});