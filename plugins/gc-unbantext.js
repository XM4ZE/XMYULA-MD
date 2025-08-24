let handler = async (m, { command, text }) => {
  if (!text) return m.reply('Masukan text yang ingin di hapus dari banned')
  let chat = global.db.data.chats[m.chat]
  let ban = chat.txtBan
  let teks = text.toLowerCase()
  let index = ban.findIndex(t => t.toLowerCase() === teks)
  if (index === -1) {
    m.reply('Text ini tidak ada di list banned')
  } else {
    ban.splice(index, 1)
    m.reply(`Berhasil Menghapus *${text}* dari list banned`)
  }
};
handler.help = ['unbantext <teks>?']
handler.tags = ['group']
handler.command = /^(unbantext)$/i
handler.group = true;
handler.botAdmin = true;
export default handler;