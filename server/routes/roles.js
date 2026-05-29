import { Router } from 'express'
import { getAllRoles, getRoleById } from '../controllers/roleController.js'

const router = Router()

router.get('/', getAllRoles)
router.get('/:id', getRoleById)

export default router
