import * as dao from '../dao/animalDAO.js'
// import { ObjectId, database } from './database.js'

const find = async() =>  dao.find()

const findById = async(id) =>  dao.findOne(id)

const findAllByRace = async(race) =>  dao.findAllByRace(race)

const findAllBySpecie = async(specie) =>  dao.findAllBySpecie(specie)

const create = async(animal) =>  dao.insertOne(animal)

const update = async(animal) =>  dao.updateOne(animal)

const deleteOne = async(id) =>  dao.deleteOne(id)


async function updateRace(race){
    // GET ALL ANIMALITOS, que tengan asignada la raza seleccionada
    let arrayAnimals = await findAllByRace(race).then(data =>{

        return data
    } ) 

    // Obtengo los IDs para hacer un updateMany, de las razas de estos animales
    const idAnimals =arrayAnimals.map(p => p._id)
    // si tengo ids
    if(idAnimals != null && idAnimals != undefined && idAnimals?.length > 0){
        return await dao.updateRaceFromAnimals(race, idAnimals)
        .then(response =>{
            return response
        })

    }else{
        return true
    }
}

async function updateSpecie(specie){
    // GET ALL ANIMALITOS, que tengan asignada la raza seleccionada
    let arrayAnimals = await findAllBySpecie(specie).then(data =>{ return data }) 
    
    // Obtengo los IDs para hacer un updateMany, de las razas de estos animales
    const idAnimals =arrayAnimals?.map(p => p._id)
    // si tengo ids
    if(idAnimals != null && idAnimals != undefined && idAnimals?.length > 0){
        return await dao.updateSpecieFromAnimals(specie, idAnimals)
        .then(response =>{
            return response
        })
    }else{
        return true
    }
}

export{
    find,
    create,
    update,
    updateRace,
    updateSpecie,
    deleteOne,
    findById,
    findAllByRace,
    findAllBySpecie,
}