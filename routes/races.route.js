import express from 'express'
import * as animalController from '../controllers/racesController.js'
import { validator } from '../middleware/tokeValidator.js'

const router = express.Router()

router.all('/races', validator)
router.all('/races/*', validator)

router.get('/races', animalController.find)
router.get('/races/:id', animalController.findById)
router.post('/races', animalController.create)
router.put('/races', animalController.update)
router.delete('/races/:id', animalController.deleteOne)

export default router