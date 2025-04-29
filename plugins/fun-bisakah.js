let handler = async (m, { conn, command, text }) => {
  conn.reply(m.chat, `
*🌎Pertanyaan:* ${command} ${text}
*💬Jawaban:* ${pickRandom(['Iya','Bisa','Tentu saja bisa','Tentu bisa','Sudah pasti','Sudah pasti bisa','Tidak','Tidak bisa','Tentu tidak','tentu tidak bisa','Sudah pasti tidak'])}
`.trim(), m)
}
handler.help = ['bisakah <pertanyaan>']
handler.tags = ['kerang']
handler.command = /^bisakah/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler 

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

