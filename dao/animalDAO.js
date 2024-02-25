import { ObjectId, database } from '../services/database.js'
const COLLECTION_NAME = 'Animals'
const find = async() =>
    database(async db => db.find({}).toArray(),COLLECTION_NAME)

const findOne = async(id) =>{
    return database(async db => db.findOne({_id: ObjectId(id)}),COLLECTION_NAME)
}

const findAllByRace = async(race) =>{
    return database(async db => db.find({"race._id": ObjectId(race._id)}).toArray(),COLLECTION_NAME)
}

const findAllBySpecie = async(specie) =>{
    console.log('findAllBySpecie: SPECIE ENVIADA')
    console.log(specie)
    return database(async db => db.find({"specie._id": ObjectId(specie._id)}).toArray(),COLLECTION_NAME)
}

const deleteOne = async(id) =>   
    database(async db => db.deleteOne({_id: ObjectId(id)}),COLLECTION_NAME)

const insertOne = async(animal) =>
    database(async db => db.insertOne({
        name:animal.name,
        age:animal.age,
        description:animal.description,
        image:animal.image,
        specie: {
            _id:ObjectId(animal.specie._id),
            name:animal.specie.name            
        },
        race: {
            _id:ObjectId(animal.race._id),
            name:animal.race.name,            
            id_specie:ObjectId(animal.race.id_specie)            
        }
    }),COLLECTION_NAME)

const updateOne = async(animal) =>
database(async db => {
 
    let response = db.updateOne({_id : {$eq:ObjectId(animal.id)}} , {$set : {
        name:animal.name,
        age:animal.age,
        description:animal.description,
        image:animal.image,
        specie: {
            _id:ObjectId(animal.specie._id),
            name:animal.specie.name            
        },
        race: {
            _id:ObjectId(animal.race._id),
            name:animal.race.name,            
            id_specie:ObjectId(animal.race.id_specie)            
        }
    } })

    return response
},COLLECTION_NAME)


const updateRaceFromAnimals = async(race , idAnimals) =>
    database(async db => {
        let inArray = []
        idAnimals?.forEach(element => inArray.push(ObjectId(element)))
        // UPDATE MANY BY IDS
        let response =  await db.updateMany({_id: { $in: inArray }}, 
            { $set: { race: {
                _id:  ObjectId(race._id),
                name: race.name,
                id_specie: ObjectId(race.id_specie)
            } } }, 
            { multi: true })
            .then(data => {
                return data
            })
     
        return response
    },COLLECTION_NAME)


const updateSpecieFromAnimals = async(specie , idAnimals) =>
    database(async db => {
     
        let inArray = []

        idAnimals?.forEach(element => inArray.push(ObjectId(element)))
        // UPDATE MANY BY IDS
        return  await db.updateMany({_id: { $in: inArray }}, 
            { $set: { specie: {
                _id:  ObjectId(specie._id),
                name: specie.name,
            } } }, 
            { multi: true })
            .then(data => { return data })
    },COLLECTION_NAME)

export{
    find,
    findOne,
    findAllByRace,
    findAllBySpecie,
    insertOne,
    updateOne,
    updateRaceFromAnimals,
    updateSpecieFromAnimals,
    deleteOne
}