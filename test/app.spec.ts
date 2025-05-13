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

        const cookie = loginRequest.headers.cookie;
        console.log(cookie);
    })
})