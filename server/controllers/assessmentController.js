import pool from '../config/database.js'
import { runForwardChaining } from '../expert-system/engine.js'

export async function submitAssessment(req, res, next) {
  try {
    const { user_id, answers, selected_skills } = req.body

    if (!user_id || !answers || !selected_skills) {
      return res.status(400).json({ error: 'Data tidak lengkap' })
    }

    const [userExists] = await pool.execute('SELECT id FROM users WHERE id = ?', [user_id])
    if (userExists.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' })
    }

    const deleteConnection = pool.getConnection()
    try {
      const conn = await deleteConnection
      await conn.beginTransaction()

      await conn.execute('DELETE FROM user_answers WHERE user_id = ?', [user_id])
      await conn.execute('DELETE FROM user_skills WHERE user_id = ?', [user_id])

      for (const ans of answers) {
        const optId = ans.selected_option_id || ans.option_id
        await conn.execute(
          'INSERT INTO user_answers (user_id, question_id, selected_option_id) VALUES (?, ?, ?)',
          [user_id, ans.question_id, optId]
        )
      }

      for (const sk of selected_skills) {
        const skillId = typeof sk === 'object' ? sk.skill_id : sk
        const isSelected = typeof sk === 'object' ? (sk.is_selected ? 1 : 0) : 1
        await conn.execute(
          'INSERT INTO user_skills (user_id, skill_id, is_selected) VALUES (?, ?, ?)',
          [user_id, skillId, isSelected]
        )
      }

      await conn.commit()
    } catch (err) {
      const conn = await deleteConnection
      await conn.rollback()
      throw err
    } finally {
      ;(await deleteConnection).release()
    }

    const [roleSkillsRaw] = await pool.execute(
      `SELECT rs.role_id, rs.skill_id, rs.weight, s.name as skill_name
       FROM role_skills rs
       JOIN skills s ON rs.skill_id = s.id`
    )

    const [allSkills] = await pool.execute('SELECT * FROM skills')

    const roleSkillsMap = {}
    for (const rs of roleSkillsRaw) {
      if (!roleSkillsMap[rs.role_id]) roleSkillsMap[rs.role_id] = []
      roleSkillsMap[rs.role_id].push(rs)
    }

    const [userAnswerRows] = await pool.execute(
      `SELECT ua.question_id, ua.selected_option_id, qo.skill_weights
       FROM user_answers ua
       JOIN question_options qo ON ua.selected_option_id = qo.id
       WHERE ua.user_id = ?`,
      [user_id]
    )

    const parsedAnswers = userAnswerRows.map(a => ({
      ...a,
      skill_weights: typeof a.skill_weights === 'string'
        ? JSON.parse(a.skill_weights)
        : a.skill_weights,
    }))

    const [userSkillRows] = await pool.execute(
      'SELECT skill_id, is_selected FROM user_skills WHERE user_id = ?',
      [user_id]
    )

    const engineResult = runForwardChaining(
      parsedAnswers,
      userSkillRows,
      roleSkillsMap,
      allSkills
    )

    const [existing] = await pool.execute(
      'SELECT id FROM assessment_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [user_id]
    )

    const resultJson = JSON.stringify({ roleMatches: engineResult.roleMatches })

    if (existing.length > 0) {
      await pool.execute(
        'UPDATE assessment_results SET role_match = ? WHERE id = ?',
        [resultJson, existing[0].id]
      )
    } else {
      await pool.execute(
        'INSERT INTO assessment_results (user_id, role_match) VALUES (?, ?)',
        [user_id, resultJson]
      )
    }

    const [roles] = await pool.execute('SELECT id, title, category FROM career_roles')

    const roleNames = {}
    roles.forEach(r => { roleNames[r.id] = r })

    const response = {
      roleMatches: engineResult.roleMatches.map(rm => ({
        ...rm,
        roleTitle: roleNames[rm.roleId]?.title || '',
        roleCategory: roleNames[rm.roleId]?.category || '',
      })),
      topRole: engineResult.topRole ? {
        ...engineResult.topRole,
        roleTitle: roleNames[engineResult.topRole.roleId]?.title || '',
        roleCategory: roleNames[engineResult.topRole.roleId]?.category || '',
      } : null,
    }

    res.json(response)
  } catch (err) {
    next(err)
  }
}

export async function getDiagnosis(req, res, next) {
  try {
    const { userId } = req.params

    const [rows] = await pool.execute(
      'SELECT * FROM assessment_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Belum ada hasil diagnosis' })
    }

    const result = rows[0]
    const roleMatch = typeof result.role_match === 'string'
      ? JSON.parse(result.role_match)
      : result.role_match

    const [roles] = await pool.execute('SELECT id, title, category, description FROM career_roles')
    const roleNames = {}
    roles.forEach(r => { roleNames[r.id] = r })

    const enriched = roleMatch.roleMatches.map(rm => ({
      ...rm,
      roleTitle: roleNames[rm.roleId]?.title || '',
      roleCategory: roleNames[rm.roleId]?.category || '',
      roleDescription: roleNames[rm.roleId]?.description || '',
    }))

    res.json({
      id: result.id,
      userId: result.user_id,
      created_at: result.created_at,
      roleMatches: enriched,
      topRole: enriched[0] || null,
    })
  } catch (err) {
    next(err)
  }
}
