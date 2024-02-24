import * as dao from '../dao/raceDAO.js'
// import { ObjectId, database } from './database.js'

const find = async() =>  dao.find()

const findById = async(id) =>  dao.findOne(id)

const create = async(race) =>  dao.insertOne(race)

const update = async(race) =>  dao.updateOne(race)

const deleteOne = async(id) =>  dao.deleteOne(id)


async function deleteByIdSpecie(idSpecie){
    // GET ALL ANIMALITOS, que tengan asignada la raza seleccionada
    return await dao.deleteManyBySpecie(idSpecie).then(data =>{

        return data
    } ) 


}


export{
    find,
    create,
    update,
    deleteOne,
    deleteByIdSpecie,
    findById
}