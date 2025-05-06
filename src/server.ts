import fastify from 'fastify';

const app = fastify();

app.get('/users', async () => {
    return 'hello world!';
});

app.listen({
    port:8080
}).then( () => {
    console.log('server started on port 8080');
});