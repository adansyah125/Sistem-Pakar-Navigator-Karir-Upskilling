import { Router } from 'express'
import { getDailyQuestions, getAllSkills } from '../controllers/questionController.js'

const router = Router()

router.get('/', getDailyQuestions)
router.get('/skills', getAllSkills)

export default router
