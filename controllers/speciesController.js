import * as service from '../services/speciesService.js'
import * as raceService from '../services/racesService.js'
import * as serviceAnimal from '../services/animalsService.js'

function find(req,res){
    
        return service.find()
        .then(species =>{
            res.json(species)
        })
        .catch(e =>{
            console.log(e)
        })
}

function findById(req,res){
    return service.findById(req.params.id)
    .then(specie =>{
        res.json(specie)
    })
}
function create(req,res){
    const specie = req.body
    return service.create(specie)
    .then(response =>{
        
        res.json(response)
    })
}
function update(req,res){
    const thisSpecie = req.body
    console.log(thisSpecie)
    return service.update(thisSpecie)
    .then(response =>{
        if(response?.acknowledged == true && response?.modifiedCount >= 0 && response?.matchedCount > 0){
            console.log('RESPONSE UPDATE SPECIE CONTROLLER' )
            console.log(response )
            serviceAnimal.updateSpecie(thisSpecie)
            .then(data => {
                if(response?.acknowledged == true && response?.matchedCount > 0){
                    res.status(201).json({success:true,message:'Especie actualizada correctamente'})
                }
            })                
        }else{
            res.status(201).json({success:false,message:'Fallo al intentar actualizar la especie'})
        }
    })
    .catch(err =>{
        console.log('ERRORR:  UPDATE SPECIE CONTROLLER' )
        console.log(err)
    
    })
}
function deleteOne(req,res){
    return service.deleteOne(req.params.id)
    .then(response =>{
        if(response.deletedCount > 0){
            raceService.deleteByIdSpecie(req.params.id)
            .then(response =>{
                if(response.acknowledged == true || deletedCount > 0){
                    res.status(200).json({
                        success: true,
                        message:"Especie eliminada exitosamente."
                    })
                }
            })
        }else{
            res.status(404).json({
                success: true,
                message:"No se encontraron registros para eliminar."
            })
        }
    })
}

export{
    find,
    create,
    update,
    findById,
    deleteOne,
}