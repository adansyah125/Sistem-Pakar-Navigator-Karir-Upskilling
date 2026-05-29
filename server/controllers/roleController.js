import pool from '../config/database.js'

export async function getAllRoles(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM career_roles ORDER BY id')
    res.json(rows)
  } catch (err) {
    next(err)
  }
}

export async function getRoleById(req, res, next) {
  try {
    const { id } = req.params
    const [roles] = await pool.execute('SELECT * FROM career_roles WHERE id = ?', [id])
    if (roles.length === 0) {
      return res.status(404).json({ error: 'Role tidak ditemukan' })
    }
    const [skills] = await pool.execute(
      `SELECT s.id, s.name, s.category, rs.weight
       FROM role_skills rs
       JOIN skills s ON rs.skill_id = s.id
       WHERE rs.role_id = ?`,
      [id]
    )
    res.json({ ...roles[0], requiredSkills: skills })
  } catch (err) {
    next(err)
  }
}
