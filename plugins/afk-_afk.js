export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
      m.reply(`
» *𝙰𝚗𝚍𝚊 𝚝𝚎𝚕𝚊𝚑 𝚋𝚎𝚛𝚑𝚎𝚗𝚝𝚒 𝙰𝙵𝙺 ! ! !*
» ${user.afkReason ? '*𝚂𝚎𝚝𝚎𝚕𝚊𝚑:* ' + user.afkReason : '𝚃𝚊𝚗𝚙𝚊 𝚊𝚕𝚊𝚜𝚊𝚗'}
» *𝚂𝚎𝚕𝚊𝚖𝚊* ${clockString(new Date - user.afk)}
`.trim())
      user.afk = -1
      user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
      let user = global.db.data.users[jid]
      if (!user) continue
      let afkTime = user.afk
      if (!afkTime || afkTime < 0) continue
      let reason = user.afkReason || ''
      m.reply(`
» *𝙳𝚒𝚊 𝚜𝚎𝚍𝚊𝚗𝚐 𝙰𝙵𝙺 ! ! !*
» ${reason ? '*𝙳𝚎𝚗𝚐𝚊𝚗 𝚊𝚕𝚊𝚜𝚊𝚗 =* ' + reason : '*𝚃𝚊𝚗𝚙𝚊 𝚊𝚕𝚊𝚜𝚊𝚗*'}
» *𝚂𝚎𝚕𝚊𝚖𝚊* ${clockString(new Date - afkTime)}
`.trim())
    }
    return true
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

