import { ObjectId, MongoClient } from "mongodb";
const client = new MongoClient('mongodb://127.0.0.1:27017')

async function database(callback,collection){
    await client.connect()
    const db = client.db('voirDB').collection(collection)
    return await callback(db)
}

export{
    database,
    ObjectId
}