import * as dao from '../dao/userDAO.js'

const find = async() =>  dao.find()

const findById = async(id) =>  dao.findOne(id)

const create = async(user) =>  dao.register(user)

const update = async(user) =>  dao.updateOne(user)

const updateProfile = async(user) =>  dao.updateProfile(user)

const register = async(user) =>  dao.register(user)

const login = async(email, password) =>  dao.login(email, password)

const deleteOne = async(id) =>  dao.deleteOne(id)

const resetPassword = async(email,password) =>  dao.resetPassword(email,password)

export{
    find,
    login,
    create,
    update,
    updateProfile,
    register,
    findById,
    deleteOne,
    resetPassword
}