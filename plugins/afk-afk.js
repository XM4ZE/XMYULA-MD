let handler = async (m, { text }) => {
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  m.reply(`
*Admin* ${conn.getName(m.sender)} *Sedang AFK*
*Alasan:* ${text ? ' ' + text : 'tanpa alasan'}
`)
}
handler.help = ['afk <alasan>']
handler.tags = ['group']
handler.command = /^afk$/i
handler.group = true
handler.admin = true

export default handler