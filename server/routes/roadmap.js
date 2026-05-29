import { Router } from 'express'
import { getRoadmap } from '../controllers/roadmapController.js'

const router = Router()

router.get('/:roleId', getRoadmap)

export default router
