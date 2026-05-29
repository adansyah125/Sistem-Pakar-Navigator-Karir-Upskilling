import pool from '../config/database.js'

export async function getRoadmap(req, res, next) {
  try {
    const { roleId } = req.params

    const [role] = await pool.execute('SELECT * FROM career_roles WHERE id = ?', [roleId])
    if (role.length === 0) {
      return res.status(404).json({ error: 'Role tidak ditemukan' })
    }

    const [roadmaps] = await pool.execute(
      'SELECT * FROM roadmaps WHERE role_id = ? ORDER BY phase',
      [roleId]
    )

    for (const r of roadmaps) {
      const [resources] = await pool.execute(
        'SELECT * FROM roadmap_resources WHERE roadmap_id = ?',
        [r.id]
      )
      r.resources = resources

      const [gaps] = await pool.execute(
        'SELECT * FROM roadmap_gaps WHERE roadmap_id = ?',
        [r.id]
      )
      r.gaps = gaps
    }

    res.json({
      role: role[0],
      phases: roadmaps,
    })
  } catch (err) {
    next(err)
  }
}
