import * as service from '../services/animalsService.js'

function find(req,res){
    
        return service.find()
        .then(animals =>{
            res.json(animals)
        })
        .catch(e =>{
            console.log(e)
        })
}

function findById(req,res){
    return service.findById(req.params.id)
    .then(animal =>{
        res.json(animal)
    })
}
function create(req,res){
    const animal = req.body
    return service.create(animal)
    .then(response =>{
        
        res.json(response)
    })
}
function update(req,res){
    const animal = req.body
    return service.update(animal)
    .then(response =>{
        res.json(response)
    })
}

function deleteOne(req,res){
    return service.deleteOne(req.params.id)
    .then(response =>{
        
        res.json(response)
    })
}

export{
    find,
    create,
    update,
    findById,
    deleteOne,
}