let handler = async (m, { command, text }) => {
  if (!text) return m.reply('Masukan text yang ingin di banned')
  let chat = global.db.data.chats[m.chat]
  let ban = chat.txtBan 
  let teks = text.toLowerCase()
  let existingText = ban.find(t => t.toLowerCase() === teks)
  if (existingText) {
    m.reply('Text ini sudah di banned')
  } else {
    ban.push(teks)
    m.reply(`Berhasil Menambahkan *${text}* kedalam list banned`)
  }
};

handler.help = ['bantext <teks>?']
handler.tags = ['group']
handler.command = /^(bantext)$/i
handler.group = true;
handler.botAdmin = true;

export default handler;