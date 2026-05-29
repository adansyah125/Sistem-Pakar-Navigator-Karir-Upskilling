import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '../../.env') })

const dbConfig = {
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sistem_pakar_karir',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

if (process.env.DB_SOCKET) {
  dbConfig.socketPath = process.env.DB_SOCKET
} else {
  dbConfig.host = process.env.DB_HOST || 'localhost'
  dbConfig.port = process.env.DB_PORT || 3306
}

const pool = mysql.createPool(dbConfig)

export default pool
