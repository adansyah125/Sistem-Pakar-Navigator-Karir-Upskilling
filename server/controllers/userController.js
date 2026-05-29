import pool from '../config/database.js'

export async function createUser(req, res, next) {
  try {
    const { nama_lengkap, jenjang, jurusan } = req.body
    if (!nama_lengkap || !jenjang || !jurusan) {
      return res.status(400).json({ error: 'Semua field harus diisi' })
    }
    const [result] = await pool.execute(
      'INSERT INTO users (nama_lengkap, jenjang, jurusan) VALUES (?, ?, ?)',
      [nama_lengkap, jenjang, jurusan]
    )
    res.status(201).json({
      id: result.insertId,
      nama_lengkap,
      jenjang,
      jurusan,
    })
  } catch (err) {
    next(err)
  }
}

export async function getUser(req, res, next) {
  try {
    const { id } = req.params
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' })
    }
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
}
