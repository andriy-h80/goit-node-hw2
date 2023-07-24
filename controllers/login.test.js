/*
Написати unit-тести для контролера входу (логін)
  -  відповідь повина мати статус-код 200
  -  у відповіді повинен повертатися токен
  -  у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

*/

const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

const {login} = require("./users");

const app = require("../app");

app.post("/users/login", login);

describe("test login controller", () => {
    let server;
    let response;

    beforeAll(() => {
        mongoose
        .connect(DB_HOST)
        .then(() => (server = app.listen(3000)))
        .catch(e => process.exit(1));
    });

    afterAll(() => {
        mongoose.disconnect(DB_HOST).then(() => {
            server.close();
        });
    });

    beforeEach(async () => {
        response = await request(app)
        .post("/users/login")
        .send({
            email: "andriy@gmail.com",
            password: "andriy",
          });
    });

    test("response.status(200)", async () => {
        expect(response.status).toBe(200);
    })

    test("get token", async () => {            
        const {token} = response.body;
        expect(token).toBeTruthy();
    })

    test("user object with two fields of string data type", async () => {
        const {user} = response.body;
        expect(typeof user.email).toBe("string");
        expect(typeof user.subscription).toBe("string");
    })
});
