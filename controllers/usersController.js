import * as service from '../services/usersService.js'
import { generate } from "../middleware/tokeValidator.js";
import * as yup from 'yup'

function login(req, res){
    service.login(req.body.email, req.body.password)
    .then(function (data){
        const token = generate({
            id: data.id,
            name: data.name,
            email: data.email
        })
        console.log('TOKEN JWT', token)
        console.log(data)
        res.header('auth-token', token).json({user: data, token: token})
    })
    .catch(function(err){
        if(err.error){
            res.status(401).json({ error: 401, msg: err.msg })
        }
        else{
            res.status(500).json({ error: 500, msg: "Ocurrio un error", err })
        }
    })
}

const schema = yup.object({
    email: yup.string().email().required("El email es obligatorio"),
    password: yup.string().min(4).required("El password es obligatorio"),
    firstName: yup.string(),
    lastName: yup.string(),
    image: yup.string(),
    isAdmin: yup.boolean().required("El rol es obligatorio")
}).noUnknown()

function register(req, res) {
    schema.validate(req.body)
    .then(function (data){
        service.register(data)
        .then(function () {
            res.status(200).json({ msg: "Usuario registrado con exito!" })
        })
        .catch(function (err) {
            if(err.error){
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else{
                res.status(500).json({ error: 500, msg: "Ocurrio un error", err })
            }
            
        })
    })
    .catch(function(err){
        res.status(400).json({ error: 400, msg: "Error en los datos", err: err.errors })
    })    
}

function getLogin(req, res){
    res.json(req.user)
}

function findAll(req, res){
    service.find()
    .then(function(result){
        res.json(result)
    })
    .catch(function (err) {
        if(err.error){
            res.status(400).json({ error: 400, msg: err.msg })
        }
        else{
            res.status(500).json({ error: 500, msg: "Ocurrio un error", err })
        }
    })
}

function findById(req,res){
    return service.findById(req.params.id)
    .then(animal =>{
        res.json(animal)
    })
}

function deleteOne(req,res){
    return service.deleteOne(req.params.id)
    .then(response =>{
        
        res.json(response)
    })
}

function create(req, res) {
    schema.validate(req.body)
    .then(function (data){
        service.create(data)
        .then(function () {
            res.status(200).json({ msg: "Usuario registrado con exito!" })
        })
        .catch(function (err) {
            if(err.error){
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else{
                res.status(500).json({ error: 500, msg: "Ocurrio un error", err })
            }
            
        })
    })
    .catch(function(err){
        res.status(400).json({ error: 400, msg: "Error en los datos", err: err.errors })
    })    
}

function update(req,res){
    const user = req.body
    return service.update(user)
    .then(response =>{
        res.json(response)
    })
}

function updateProfile(req,res){
    const data = req.body
    return service.updateProfile(data)
    .then(response =>{
        res.json(response)
    })
}

function resetPassword(req, res){
    service.resetPassword(req.body.email, req.body.password)
    .then(function (data){
        if(data.success){
            res.status(200).json(data)
        }else{
            res.status(400).json({ error: 400, msg: err.msg })
        }
    })
    .catch(function(err){
        if(err.error){
            res.status(401).json({ error: 401, msg: err.msg })
        }
        else{
            res.status(500).json({ error: 500, msg: "Ocurrio un error", err })
        }
    })
}

export{
    login,
    register,
    findAll,
    findById,
    deleteOne,
    getLogin,
    update,
    updateProfile,
    create,
    resetPassword
}