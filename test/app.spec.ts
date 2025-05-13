import {describe, expect, vitest, it, beforeAll, afterAll, beforeEach} from "vitest";
import app from "../src/app";
import { execSync } from "node:child_process";
// @ts-ignore
import request from "supertest";

beforeAll( async () => {
    await app.ready();
})

afterAll( async () => {
    await app.close();
})

beforeEach( async () => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
});

describe('User Routes', () => {
    it("should be possible to list create a user", async () => {
        await request(app.server)
            .get("/users")
            .expect(200)
    });

    it("should be possible to create a user", async () => {
       await request(app.server)
            .post("/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com"
            }).expect(201);
    })
});

describe("Login Routes", () => {
    it("should be possible to log in a user", async () => {
        await request(app.server)
            .post("/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com"
            }).expect(201);

       await request(app.server)
            .post("/login")
            .send({
                email: "john@doe.com",
                password: "1020304050"
            }).expect(200);
    })
});

describe("Snack Routes", () => {

    it("should be possible to list the meals", async () => {
        await request(app.server)
            .post("/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com"
            }).expect(201);

        const loginRequest = await request(app.server)
            .post("/login")
            .send({
                email: "john@doe.com",
                password: "1020304050"
            }).expect(200);

        const cookie = loginRequest.get('set-cookie');

        const snacksRequest = await request(app.server)
            .get("/snacks")
            .set("cookie", cookie)
            .expect(200);
    })

    it("it should be possible to list a specific meal", async () => {
        await request(app.server)
            .post("/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com"
            }).expect(201);

        const loginRequest = await request(app.server)
            .post("/login")
            .send({
                email: "john@doe.com",
                password: "1020304050"
            }).expect(200);

        const cookie = loginRequest.get('set-cookie');

        const snackRequest = await request(app.server)
            .post("/snacks")
            .set('cookie', cookie)
            .send({
                name: 'test',
                description: 'test description',
                isInside: true
            }).expect(201);

        const snacksRequest = await request(app.server)
            .get("/snacks")
            .set("cookie", cookie)
            .expect(200);

        const snackId = snacksRequest.body.snacks[0].id;

        await request(app.server)
            .get(`/snacks/${snackId}`)
            .set("cookie", cookie)
            .expect(200);

    })

    it("It should be possible to register a meal", async () => {
        await request(app.server)
            .post("/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com"
            }).expect(201);

        const loginRequest = await request(app.server)
            .post("/login")
            .send({
                email: "john@doe.com",
                password: "1020304050"
            }).expect(200);

        const cookie = loginRequest.get('set-cookie');

        await request(app.server)
            .post("/snacks")
            .set('cookie', cookie)
            .send({
                name: 'test',
                description: 'test description',
                isInside: true
            }).expect(201);
    })

    it("should be possible to update a meal", async () => {
        await request(app.server)
            .post("/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com"
            }).expect(201);

        const loginRequest = await request(app.server)
            .post("/login")
            .send({
                email: "john@doe.com",
                password: "1020304050"
            }).expect(200);

        const cookie = loginRequest.get('set-cookie');

        const snackRequest = await request(app.server)
            .post("/snacks")
            .set('cookie', cookie)
            .send({
                name: 'test',
                description: 'test description',
                isInside: true
            }).expect(201);

        const snacksRequest = await request(app.server)
            .get("/snacks")
            .set("cookie", cookie)
            .expect(200);

        const snackId = snacksRequest.body.snacks[0].id;

        await request(app.server)
            .put(`/snacks/${snackId}`)
            .set('cookie', cookie)
            .send({
                name: 'test updated',
                description: 'test description updated',
                isInside: false
            }).expect(200)
    })

    it("should be possible to delete a meal", async () => {
        await request(app.server)
            .post("/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com"
            }).expect(201);

        const loginRequest = await request(app.server)
            .post("/login")
            .send({
                email: "john@doe.com",
                password: "1020304050"
            }).expect(200);

        const cookie = loginRequest.get('set-cookie');

        const snackRequest = await request(app.server)
            .post("/snacks")
            .set('cookie', cookie)
            .send({
                name: 'test',
                description: 'test description',
                isInside: true
            }).expect(201);

        const snacksRequest = await request(app.server)
            .get("/snacks")
            .set("cookie", cookie)
            .expect(200);

        const snackId = snacksRequest.body.snacks[0].id;

        await request(app.server)
            .delete(`/snacks/${snackId}`)
            .set('cookie', cookie)
            .send({}).expect(204)
    })
})

describe("Metric Routes", () => {
    it("It should be possible to see the metrics of the registered meals", async () => {
        await request(app.server)
            .post("/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@doe.com"
            }).expect(201);

        const loginRequest = await request(app.server)
            .post("/login")
            .send({
                email: "john@doe.com",
                password: "1020304050"
            }).expect(200);

        const cookie = loginRequest.get('set-cookie');

        await request(app.server)
            .get('/metrics')
            .set('cookie', cookie)
            .expect(200);
    });
})