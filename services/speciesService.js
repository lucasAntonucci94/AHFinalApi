import * as dao from '../dao/specieDAO.js'
// import { ObjectId, database } from './database.js'

const find = async() =>  dao.find()

const findById = async(id) =>  dao.findOne(id)

const create = async(specie) =>  dao.insertOne(specie)

const update = async(specie) =>  dao.updateOne(specie)

const deleteOne = async(id) =>  dao.deleteOne(id)

export{
    find,
    create,
    update,
    deleteOne,
    findById
}