import { expect } from "chai"
import supertest from "supertest"
import env from "../src/utils/env.util.js";
import { it } from "mocha";

const requester = supertest(`http://localhost:${env.PORT}/api`)

describe(
    "Testing adoptions",
    ()=> {
        let userId = "22f00e5b12b3c5110c7ef2dc"
        let petId = "e367b47bec639d0bd1c46f9e"
        let adoptionId = "67586511dd39fca912a1c78a"
        it(
            "Create adoption",
            async()=> {
                const response = await requester.post(`/adoptions/` + userId + "/" + petId)
                const { statusCode, _body } = response;
                if (_body.error && _body.error === "Pet is already adopted") {
                    // Si la mascota ya ha sido adoptada, verificamos que la respuesta sea un error 400
                    expect(statusCode).to.be.equals(400);
                    expect(_body).to.have.property("status").that.equals("error")
                    expect(_body).to.have.property("error").that.equals("Pet is already adopted")
                } else {
                    // Si la adopción es exitosa
                    expect(statusCode).to.be.equals(200);
                    expect(_body).to.have.property("status").that.equals("success")
                    expect(_body).to.have.property("message").that.equals("Pet adopted")
                }
            }
        )   
        it(
            "Get all adoptions",
            async()=> {
                const response = await requester.get("/adoptions")
                const { statusCode } = response
                expect(statusCode).to.be.equals(200)
            }
        )
        it(
            "Get adoption",
            async()=> {
                const response = await requester.get(`/adoptions/`+adoptionId)
                const { statusCode, _body } = response;
                expect(statusCode).to.be.equals(200);
                expect(_body.payload).to.be.an("object")
            }
        )   
    }
)