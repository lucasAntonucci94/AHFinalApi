import express from 'express'
import * as animalController from '../controllers/speciesController.js'
import { validator } from '../middleware/tokeValidator.js'

const router = express.Router()

router.all('/species', validator)
router.all('/species/*', validator)

router.get('/species', animalController.find)
router.get('/species/:id', animalController.findById)
router.post('/species', animalController.create)
router.put('/species', animalController.update)
router.delete('/species/:id', animalController.deleteOne)

export default router