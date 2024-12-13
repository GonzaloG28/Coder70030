import __dirname from "./index.js"

const opts = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "CODER BACKEND 70030",
            description: "Documentacion de rutas del proyecto Backend70030"
        }
    },
    apis: [`src/docs/*.yaml`],
}

export default opts