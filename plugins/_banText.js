let handler = m => m
handler.before = async function (m, { conn, text, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let teks = m.text
  let chat = global.db.data.chats[m.chat]
  let txtBan = chat.txtBan || []
  if (!isAdmin || !isBotAdmin) {
    if (txtBan.some(ban => teks.toLowerCase().includes(ban.toLowerCase())) && m.isGroup && !isAdmin) {
      this.sendMessage(m.chat, { delete: m.key })
    }
  }
}
export default handler