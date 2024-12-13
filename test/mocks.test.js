import { expect } from "chai"
import supertest from "supertest"
import env from "../src/utils/env.util.js";
import { it } from "mocha";

const requester = supertest(`http://localhost:${env.PORT}/api/mocks`)

describe(
    "Testing Mocks",
    ()=> {
        const data = { users: "10", pets: "5" }
        it(
            "Create Mocks Pets",
            async ()=> {
                const response = await requester.get("/mockingpets")
                const { statusCode } = response
                expect(statusCode).to.be.equals(201)
            }
        )
        it(
            "Create Mocks Users",
            async ()=> {
                const response = await requester.get("/mockingusers")
                const { statusCode } = response
                expect(statusCode).to.be.equals(201)
            }
        )
        it(
            "Create Mocks Users and Pets",
            async ()=> {
                const response = await requester.post("/generateData").send(data)
                const { statusCode } = response
                expect(statusCode).to.be.equals(201)
            }
        )
    }
)