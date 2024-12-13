import { expect } from "chai"
import supertest from "supertest"
import env from "../src/utils/env.util.js";
import { it } from "mocha";

const requester = supertest(`http://localhost:${env.PORT}/api/users`)

describe(
    "Testing Users",
    ()=> {
        const data = { email: "ignaaaaacio@coder.com", password: "hola1234" }
        let uid = ""
        it(
            "Get user",
            async ()=> {
                const response = await requester.get("/"+uid)
                const {  statusCode } = response
                expect(statusCode).to.be.equals(200)
            }
        )
        it(
            "Get All Users",
            async ()=> {
                const response = await requester.get("/")
                const {  statusCode } = response
                // console.log({ statusCode });
                expect(statusCode).to.be.equals(200)
            }
        )
        it(
            "Update Users",
            async ()=> {
                uid = "8ddffcfc3d03bd9e1fe87aa7"
                const obj = { password: "chau1234" }
                const response = await requester.put("/"+uid).send(obj)
                const { statusCode } = response
                expect(statusCode).to.be.equals(200)
            }
        )
        it(
            "Delete User",
            async ()=> {
                const response = await requester.delete("/"+uid)
                const { statusCode } = response
                expect(statusCode).to.be.equals(200)
            }
        )
    }
)