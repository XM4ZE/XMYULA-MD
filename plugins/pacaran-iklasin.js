let handler = async (m, { conn }) => {
  if (global.db.data.users[m.sender].pasangan == "") return conn.reply(m.chat, `*kamu sedang tidak menembak siapapun.*`, m)
  if (global.db.data.users[global.db.data.users[m.sender].pasangan].pasangan == m.sender) return conn.reply(m.chat, `Kamu telah berpacaran dengan @${global.db.data.users[m.sender].pasangan.split('@')[0]}`, m, {contextInfo: {
    mentionedJid: [global.db.data.users[m.sender].pasangan]
  }})
  conn.reply(m.chat, `kamu sudah *mengikhlaskan @${global.db.data.users[m.sender].pasangan.split('@')[0]}* karena dia tidak memberikan jawaban diterima atau ditolak`, m, {contextInfo: {
    mentionedJid: [global.db.data.users[m.sender].pasangan]
  }})
  global.db.data.users[m.sender].pasangan = ""
}
handler.help = ['ikhlasin']
handler.tags = ['pacaran']
handler.command = /^(ikhlasin|ikhlas)$/i
handler.mods = false
handler.register = true
handler.group = true

export default handler