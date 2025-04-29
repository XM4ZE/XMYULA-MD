// Jangan buly saya om saya cuma bercanda:)


let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `
*Pertanyaan:* ${m.text}
*Jawaban:* ${pickRandom(['Iya','Sudah pasti','Sudah pasti bisa','Tidak','Tentu tidak','Sudah pasti tidak'])}
`.trim(), m, {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: wm,jpegThumbnail: Buffer.alloc(0)}}}})
}
handler.help = ['benarkah'].map(v => v + ' <text>')
handler.tags = ['kerang']
handler.command = /^benarkah/i
handler.owner = false

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

