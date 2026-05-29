export function runForwardChaining(userAnswers, userSkills, roleSkillsMap, allSkills) {
  const answerScores = {}

  for (const answer of userAnswers) {
    const weights = answer.skill_weights || {}
    for (const [skillId, points] of Object.entries(weights)) {
      const sid = parseInt(skillId)
      answerScores[sid] = (answerScores[sid] || 0) + points
    }
  }

  const selectedSet = new Set(
    userSkills.filter(us => us.is_selected).map(us => us.skill_id)
  )

  const results = []

  for (const [roleId, roleSkills] of Object.entries(roleSkillsMap)) {
    let totalWeight = 0
    let earnedWeight = 0
    const strengths = []
    const gaps = []
    const requiredSkillIds = new Set(roleSkills.map(rs => rs.skill_id))

    for (const rs of roleSkills) {
      totalWeight += rs.weight
      const hasSkill = selectedSet.has(rs.skill_id)
      const answerPoints = answerScores[rs.skill_id] || 0

      if (hasSkill) {
        const bonus = Math.min(10, answerPoints * 2)
        earnedWeight += rs.weight * (1 + bonus / 100)
        strengths.push({
          skillId: rs.skill_id,
          skillName: rs.skill_name,
          weight: rs.weight,
        })
      } else {
        earnedWeight += Math.min(rs.weight * 0.3, answerPoints * 5)
        gaps.push({
          skillId: rs.skill_id,
          skillName: rs.skill_name,
          weight: rs.weight,
          userScore: answerPoints,
          type: 'missing',
        })
      }
    }

    for (const sid of selectedSet) {
      if (!requiredSkillIds.has(sid)) {
        const skill = allSkills.find(s => s.id === sid)
        if (skill) {
          gaps.push({
            skillId: skill.id,
            skillName: skill.name,
            weight: 0,
            userScore: 0,
            type: 'irrelevant',
          })
        }
      }
    }

    const matchPct = totalWeight > 0
      ? Math.min(100, Math.round((earnedWeight / totalWeight) * 100))
      : 0

    results.push({
      roleId: parseInt(roleId),
      matchPct,
      skillGaps: gaps,
      strengths,
    })
  }

  results.sort((a, b) => b.matchPct - a.matchPct)

  return {
    roleMatches: results,
    topRole: results[0] || null,
  }
}
