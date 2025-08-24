let handler = m => m

handler.before = function (m) {
  let user = global.db.data.users[m.sender]

  let role = (user.level <= 2) ? 'Newbie ㋡'
    : (user.level <= 4) ? 'Beginner Grade 1 ⚊¹'
    : (user.level <= 6) ? 'Beginner Grade 2 ⚊²'
    : (user.level <= 8) ? 'Beginner Grade 3 ⚊³'
    : (user.level <= 10) ? 'Beginner Grade 4 ⚊⁴'
    : (user.level <= 20) ? 'Private Grade 1 ⚌¹'
    : (user.level <= 30) ? 'Private Grade 2 ⚌²'
    : (user.level <= 40) ? 'Private Grade 3 ⚌³'
    : (user.level <= 50) ? 'Private Grade 4 ⚌⁴'
    : (user.level <= 60) ? 'Private Grade 5 ⚌⁵'
    : (user.level <= 70) ? 'Corporal Grade 1 ☰¹'
    : (user.level <= 80) ? 'Corporal Grade 2 ☰²'
    : (user.level <= 90) ? 'Corporal Grade 3 ☰³'
    : (user.level <= 100) ? 'Legendary 忍'
    : 'Legendary 忍' 
  
  user.role = role
  return true
}

export default handler