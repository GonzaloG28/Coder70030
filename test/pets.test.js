import { expect } from "chai"
import supertest from "supertest"
import env from "../src/utils/env.util.js";
import { it } from "mocha";

const requester = supertest(`http://localhost:${env.PORT}/api/pets`)

describe(
    "Testing Pets",
    ()=> {
        const data = {name:"pepito", specie: "leon", birthDate: "10-12-2024"}
        const dataImage = {name:"lalo", specie: "iguana", birthDate: "11-12-2024"}
        let pid = ""
        it(
            "Create Pet",
            async ()=> {
                const response = await requester.post("/").send(data)
                const { payload, statusCode } = response
                pid = payload
                expect(statusCode).to.be.equals(200)
            }
        )
        it(
            "Get All Pets",
            async ()=> {
                const response = await requester.get("/")
                const { statusCode } = response
                expect(statusCode).to.be.equals(200)
            }
        )
        it(
            "Create Pet With Image",
            async ()=> {
                const response = await requester.post("/withimage").send(dataImage)
                const { payload, statusCode } = response
                pid = payload
                expect(statusCode).to.be.equals(200)
            }
        )
        it(
            "Update Pet",
            async ()=> {
                pid = "ed2a96ee0d52b04fcbed2dfc"
                const obj = { name: "lalo" }
                const response = await requester.put("/"+pid).send(obj)
                const { statusCode } = response
                expect( statusCode ).to.be.equals(200)
            }
        )
        it(
            "Delete Pet",
            async ()=> {
                const response = await requester.delete("/"+pid)
                const { statusCode } = response
                expect(statusCode).to.be.equals(200)
            }
        )
    }
)