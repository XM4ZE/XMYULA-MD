const handler = async (m, { conn }) => {
  const chat = db.data.chats[m.chat]
  const cap = ` *List Text Yang Di Banned di Group ini* \n\n${chat.txtBan.map((txt) => `- ${txt}`).join('\n')}\n\n*Total Banned:* ${chat.txtBan.length}\n\n> ${wm}`
  m.reply(cap)
}
handler.command = handler.help = ['bantextlist'];
handler.tags = ['group'];
handler.group = true
export default handler;