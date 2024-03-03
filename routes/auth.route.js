import express from 'express'
import * as usersController from '../controllers/usersController.js'
import { validator } from '../middleware/tokeValidator.js'

const router = express.Router()

router.get('/users/*')

router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.put('/reset-password', usersController.resetPassword)
// router.get('/login', [validator], usersController.getLogin)
router.get('/users', usersController.findAll)
router.get('/users/:id', usersController.findById)
router.get('/users/email/:email', usersController.findByEmail)
router.post('/users', usersController.create)
router.put('/users', usersController.update)
router.put('/profile', usersController.updateProfile)
router.delete('/users/:id', usersController.deleteOne)

export default router