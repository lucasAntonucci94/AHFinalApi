import { ObjectId, database } from '../services/database.js'
import bcrypt from 'bcrypt'
const COLLECTION_NAME = 'Users'
const find = async() =>
    database(async db => db.find({}).toArray(),COLLECTION_NAME)

const findOne = async(id) =>{
    return database(async db => db.findOne({_id: ObjectId(id)}),COLLECTION_NAME)
}

const insertOne = async(user) =>
    database(async db => db.insertOne(user),COLLECTION_NAME)

    
async function create(user) {

    return await database(async function(db){
        
        const userOld = await db.findOne({ email: user.email })

        if (!userOld) {
            
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(user.password, salt)
            return await db.insertOne({
                email: user.email,
                password: password,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
            })
        }
        else{
            throw { error: 400, msg: "El usuarioawdadwad ya existe." }
        }
    },COLLECTION_NAME)

}

async function register(user) {

    return await database(async function(db){
        
        const userOld = await db.findOne({ email: user.email })
        if (!userOld) {
            
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(user.password, salt)
          
            await db.insertOne({
                email: user.email,
                password: password,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
            })
        }
        else{
            throw { error: 400, msg: "El usuario ya existe." }
        }
    },COLLECTION_NAME)

}
    
async function login(email, password) {

    const user = await database(async db => db.findOne({ email: email }),COLLECTION_NAME)       
        if(user){
            const validate = await bcrypt.compare(password, user.password)
            if(validate){
                return {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    image: user.image,
                    isAdmin: user.isAdmin
                }
            }
            else{
                throw {error: 1000, msg: "El password no coincide."}    
            }
        }
        else{
            throw {error: 1000, msg: "El E-Mail no existe."}
        }   
}
    
async function resetPassword(email, password) {
    try {
      const result = await database(async (db) => {
        const user = await db.findOne({ email: email });
        if (!user) {
          throw { error: 404, msg: "Usuario no encontrado." }; // Consistent error format
        }
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        var response = await db.updateOne({ _id: ObjectId(user._id) }, { $set: { password: newPassword } });
        return { success: true, msg: "Contraseña actualizada exitosamente." };
      }, COLLECTION_NAME);
      
      return result;
    } catch (error) {
      console.error("Error al actualizar contraseña:", error); // Log errors
      throw error;
    }
  }
const deleteOne = async(id) =>   
    database(async db => db.deleteOne({_id: ObjectId(id)}),COLLECTION_NAME)

const updateOne = async(user) =>
    database(async db => {
        return db.updateOne({_id : {$eq:ObjectId(user.id)}} , {$set : {
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            isAdmin: user.isAdmin
        } })
},'Users')

const updateProfile = async(data) =>
    database(async db => {
        const dbUser = await db.findOne({ email: data.email });
        if(dbUser){
            console.log(data)
            console.log(dbUser)
            const response = await db.updateOne({_id : {$eq:ObjectId(dbUser._id)}} , {$set : {
                email:data.email,
                firstName:data.firstName,
                lastName:data.lastName,
                image:data.image ?? dbUser.image,
            } })
            response.upsertedId = dbUser._id
            return response
        }
},'Users')


export{
    login,
    register,
    create,
    find,
    findOne,
    insertOne,
    deleteOne,
    updateOne,
    updateProfile,
    resetPassword
}