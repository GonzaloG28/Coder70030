import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import { faker } from "@faker-js/faker"
import __dirname from "../utils/index.js";
import petModel from "../dao/models/Pet.js";
import Pet from "../dao/Pets.dao.js";

const getAllPets = async(req,res)=>{
    const pets = await petsService.getAll();
    res.send({status:"success",payload:pets})
}

const createPet = async(req,res)=> {
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}

const createMocksPets = async (req, res, next) =>{
    const pets = []
    const quantity  = 100
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
        message: quantity + " MOCK PETS CREATED"
    })
}

const updatePet = async(req,res) =>{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId,petUpdateBody);
    res.send({status:"success",message:"pet updated"})
}

const deletePet = async(req,res)=> {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.send({status:"success",message:"pet deleted"});
}

const createPetWithImage = async(req,res) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    console.log(pet);
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}
export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage,
    createMocksPets
}