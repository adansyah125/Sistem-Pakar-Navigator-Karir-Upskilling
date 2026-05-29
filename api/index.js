import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import userRoutes from '../server/routes/users.js'
import roleRoutes from '../server/routes/roles.js'
import questionRoutes from '../server/routes/questions.js'
import assessmentRoutes from '../server/routes/assessment.js'
import roadmapRoutes from '../server/routes/roadmap.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/assessment', assessmentRoutes)
app.use('/api/roadmap', roadmapRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(500).json({ error: 'Internal Server Error', message: err.message })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Sistem Pakar Karir API running on port ${PORT}`)
})

export default app
