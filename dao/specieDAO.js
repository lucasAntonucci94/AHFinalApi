import { ObjectId, database } from '../services/database.js'

const find = async() =>
    database(async db => db.find({}).toArray(),'Species')

const findOne = async(id) =>{
    return database(async db => db.findOne({_id: ObjectId(id)}),'Species')
}

const insertOne = async(animal) =>
    database(async db => db.insertOne(animal),'Species')

const updateOne = async(specie) =>
    database(async db => {
        return db.updateOne({_id : {$eq:ObjectId(specie._id)}} , {$set : {
        name:specie.name,
    } })
},'Species')


const deleteOne = async(id) =>   
    database(async db => db.deleteOne({_id: ObjectId(id)}),'Species')


export{
    find,
    findOne,
    insertOne,
    updateOne,
    deleteOne
}