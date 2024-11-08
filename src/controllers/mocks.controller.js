import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"
import __dirname from "../utils/index.js";
import petModel from "../dao/models/Pet.js";
import userModel from "../dao/models/User.js";


const createMocksPets = async (req, res, next) =>{
    
        const pets = []
        const quantity = 100
            for(let i = 0; i < quantity; i++){
                const pet = {
                    _id: faker.database.mongodbObjectId(),
                    name: faker.person.firstName().toLowerCase(),
                    specie: faker.animal.type(),
                    birthDate: faker.date.past(5),
                    adopted: false,
                    owner: null,
                    image: faker.image.url({width: 300, height: 300, category: "animals"})
        }
        const one = await petModel.create(pet)
    }
        return res.status(201).json({
            message: quantity + " MOCK USERS CREATED"
        })
}

const createMocksUsers = async (req, res, next) =>{
    
        const users = []
        const quantity = 50

        for(let i = 0; i < quantity; i++){
            const password = await bcrypt.hash("coder123", 10)
            const user = {
                _id: faker.database.mongodbObjectId(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: password,
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: [],
            }
            const one = await userModel.create(user)
        }
        return res.status(201).json({
            message: quantity + " MOCK USERS CREATED"
        })
}

const generateData = async (req, res, next) => {
    const { users, pets} = req.body
    const usersInsert = []
    const petsInsert = []

    for(let i = 0; i < pets; i++){
        petsInsert.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.person.firstName().toLowerCase(),
            specie: faker.animal.type(),
            birthDate: faker.date.past(5),
            adopted: false,
            owner: null,
            image: faker.image.url({width: 300, height: 300, category: "animals"})
        })
    }

    for(let i = 0; i < users; i++){
        const password = await bcrypt.hash("coder123", 10)
        usersInsert.push({
            _id: faker.database.mongodbObjectId(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: password,
            role: faker.helpers.arrayElement(["user", "admin"]),
            pets: [],
        })

    }

    try{
        await userModel.insertMany(usersInsert)
        await petModel.insertMany(petsInsert)

        return res.status(201).json({
            message: `${users} users and ${pets} pets generated into the database`
        })

    }catch(error){
        next(error)
    }

}

export default {
    createMocksPets,
    createMocksUsers,
    generateData
}