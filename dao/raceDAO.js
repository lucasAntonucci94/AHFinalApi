import { ObjectId, database } from '../services/database.js'

const find = async() =>
    database(async db => db.find({}).toArray(),'Races')

const findOne = async(id) =>{
    return database(async db => db.findOne({_id: new ObjectId(id)}),'Races')
}

const insertOne = async(race) =>
    database(async db => db.insertOne({
        name: race.name,
        id_specie: new ObjectId(race.id_specie)
    }),'Races')

const deleteOne = async(id) =>   
    database(async db => db.deleteOne({_id: new ObjectId(id)}),'Races')

const deleteManyBySpecie = async(id) =>   
    database(async db => db.deleteMany({id_specie: new ObjectId(id)}),'Races')

    
const updateOne = async(race) =>
database(async db => {

    return db.updateOne({_id : {$eq:new ObjectId(race._id)}} , {$set : {
        name:race.name,
        id_specie:new ObjectId(race.id_specie),
    } })
},'Races')


export{
    find,
    findOne,
    insertOne,
    updateOne,
    deleteOne,
    deleteManyBySpecie
}