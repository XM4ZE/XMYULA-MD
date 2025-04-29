export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return !0
  let chat = global.db.data.chats[m.chat]
  let isPolling = m.mtype
  let hapus = m.key.participant
  let bang = m.key.id
  if (chat.antiPolling && isPolling) {
    if(isPolling === "pollCreationMessageV3"){
        if (!isBotAdmin || isAdmin){                  
        } else {
          m.reply(`*Terdeteksi Anda mengirim Polling*\n\nSory Polling yang kamu kirim akan di hapus, karna admin mengaktifkan Antipolling`)
    return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        } return !1
    }
  }
}