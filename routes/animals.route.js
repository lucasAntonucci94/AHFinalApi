import express from 'express'
import * as animalController from '../controllers/animalsController.js'
import { validator } from '../middleware/tokeValidator.js'

const router = express.Router()

router.all('/animals', validator)
router.all('/animals/*', validator)

router.get('/animals', animalController.find)
router.get('/animals/:id', animalController.findById)
router.post('/animals', animalController.create)
router.put('/animals', animalController.update)
router.delete('/animals/:id', animalController.deleteOne)

export default router