import pool from '../config/database.js'

export async function getDailyQuestions(req, res, next) {
  try {
    const date = req.query.date || new Date().toISOString().split('T')[0]

    const [existing] = await pool.execute(
      'SELECT question_id FROM daily_questions WHERE date = ? AND is_active = 1',
      [date]
    )

    let questionIds

    if (existing.length > 0) {
      questionIds = existing.map(dq => dq.question_id)
    } else {
      const [allQuestions] = await pool.execute(
        'SELECT id FROM questions ORDER BY RAND() LIMIT 12'
      )
      questionIds = allQuestions.map(q => q.id)

      const values = allQuestions.map(q => [q.id, date, 1])
      await pool.query(
        'INSERT INTO daily_questions (question_id, date, is_active) VALUES ?',
        [values]
      )
    }

    const [questions] = await pool.execute(
      'SELECT * FROM questions WHERE id IN (' + questionIds.map(() => '?').join(',') + ') ORDER BY order_num',
      questionIds
    )

    const result = []
    for (const q of questions) {
      const [options] = await pool.execute(
        'SELECT id, option_text, skill_weights FROM question_options WHERE question_id = ?',
        [q.id]
      )
      result.push({
        id: q.id,
        question_text: q.question_text,
        order_num: q.order_num,
        options: options.map(o => ({
          id: o.id,
          option_text: o.option_text,
          skill_weights: typeof o.skill_weights === 'string' ? JSON.parse(o.skill_weights) : o.skill_weights,
        })),
      })
    }

    res.json(result)
  } catch (err) {
    next(err)
  }
}

export async function getAllSkills(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM skills ORDER BY name')
    res.json(rows)
  } catch (err) {
    next(err)
  }
}
