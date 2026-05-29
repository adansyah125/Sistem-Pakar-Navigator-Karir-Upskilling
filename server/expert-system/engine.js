import { SKILL_BASE_VALUE, ROLE_THRESHOLDS, SKILL_BOOST } from './rules.js'

export function runForwardChaining(userAnswers, userSkills, roleSkillsMap, allSkills) {
  const skillScores = {}
  const skillDetail = {}

  allSkills.forEach(s => {
    skillScores[s.id] = 0
    skillDetail[s.id] = { fromAnswers: 0, fromSelection: 0 }
  })

  for (const answer of userAnswers) {
    const weights = answer.skill_weights || {}
    for (const [skillId, points] of Object.entries(weights)) {
      const sid = parseInt(skillId)
      skillScores[sid] = (skillScores[sid] || 0) + points
      skillDetail[sid].fromAnswers += points
    }
  }

  const selectedSkillIds = userSkills
    .filter(us => us.is_selected)
    .map(us => us.skill_id)

  for (const sid of selectedSkillIds) {
    skillScores[sid] = (skillScores[sid] || 0) + SKILL_BASE_VALUE
    skillDetail[sid].fromSelection += SKILL_BASE_VALUE
  }

  if (selectedSkillIds.length >= 4) {
    const bonusSkillId = selectedSkillIds[0]
    skillScores[bonusSkillId] += SKILL_BOOST.QUAD_BONUS
    skillDetail[bonusSkillId].fromSelection += SKILL_BOOST.QUAD_BONUS
  } else if (selectedSkillIds.length >= 3) {
    const bonusSkillId = selectedSkillIds[0]
    skillScores[bonusSkillId] += SKILL_BOOST.TRIO_BONUS
    skillDetail[bonusSkillId].fromSelection += SKILL_BOOST.TRIO_BONUS
  } else if (selectedSkillIds.length >= 2) {
    const bonusSkillId = selectedSkillIds[0]
    skillScores[bonusSkillId] += SKILL_BOOST.PAIR_BONUS
    skillDetail[bonusSkillId].fromSelection += SKILL_BOOST.PAIR_BONUS
  }

  const results = []

  for (const [roleId, roleSkills] of Object.entries(roleSkillsMap)) {
    let totalWeight = 0
    let earnedScore = 0

    for (const rs of roleSkills) {
      totalWeight += rs.weight
      const userScore = skillScores[rs.skill_id] || 0
      const maxPossible = rs.weight + SKILL_BASE_VALUE
      const skillMatchPct = Math.min(100, Math.round((userScore / maxPossible) * 100))
      earnedScore += (skillMatchPct / 100) * rs.weight
    }

    const matchPct = totalWeight > 0 ? Math.round((earnedScore / totalWeight) * 100) : 0
    const gaps = roleSkills
      .filter(rs => {
        const userScore = skillScores[rs.skill_id] || 0
        const maxPossible = rs.weight + SKILL_BASE_VALUE
        const pct = Math.min(100, Math.round((userScore / maxPossible) * 100))
        return pct < 50
      })
      .map(rs => ({
        skillId: rs.skill_id,
        skillName: rs.skill_name,
        weight: rs.weight,
        userScore: skillScores[rs.skill_id] || 0,
      }))

    results.push({
      roleId: parseInt(roleId),
      matchPct,
      skillGaps: gaps,
      strengths: roleSkills
        .filter(rs => {
          const userScore = skillScores[rs.skill_id] || 0
          const maxPossible = rs.weight + SKILL_BASE_VALUE
          return Math.min(100, Math.round((userScore / maxPossible) * 100)) >= 70
        })
        .map(rs => ({
          skillId: rs.skill_id,
          skillName: rs.skill_name,
          weight: rs.weight,
        })),
    })
  }

  results.sort((a, b) => b.matchPct - a.matchPct)

  return {
    roleMatches: results,
    skillScores,
    skillDetail,
    topRole: results[0] || null,
  }
}
