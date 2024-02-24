import * as service from '../services/racesService.js'
import * as serviceAnimal from '../services/animalsService.js'

function find(req,res){
    
        return service.find()
        .then(races =>{
            res.json(races)
        })
        .catch(e =>{
            console.log(e)
        })
}

function findById(req,res){
    return service.findById(req.params.id)
    .then(race =>{
        res.json(race)
    })
}
function create(req,res){
    const race = req.body
    return service.create(race)
    .then(response =>{
        
        res.json(response)
    })
}

function update(req,res){
    const thisRace = req.body
    console.log(thisRace)
    return service.update(thisRace)
    .then(response =>{

        if(response?.acknowledged == true && response?.modifiedCount >= 0 && response?.matchedCount > 0){
            console.log('RESPONSE UPDATE RACE CONTROLLER' )
            console.log(response )
            serviceAnimal.updateRace(thisRace)
            .then(data => {
                res.status(201).json({success:true,message:'Raza actualizada correctamente'})
            })                
        }else{
            res.status(201).json({success:false,message:'Fallo al intentar actualizar la raza'})
        }
    })
    .catch(err =>{
        console.log('ERRORR:  UPDATE RACE CONTROLLER' )
        console.log(err)
    
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