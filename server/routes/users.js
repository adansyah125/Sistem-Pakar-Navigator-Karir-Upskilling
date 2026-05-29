import { Router } from 'express'
import { createUser, getUser } from '../controllers/userController.js'

const router = Router()

router.post('/', createUser)
router.get('/:id', getUser)

export default router
