import { Router } from 'express'
import { submitAssessment, getDiagnosis } from '../controllers/assessmentController.js'

const router = Router()

router.post('/submit', submitAssessment)
router.get('/diagnosis/:userId', getDiagnosis)

export default router
