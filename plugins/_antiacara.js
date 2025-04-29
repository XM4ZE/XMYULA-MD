export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let sender = global.db.data.chats[m.sender]
  let isAcara = m.mtype
  let hapus = m.key.participant
  let bang = m.key.id
  if (chat.antiAcara && isAcara) {
    if(isAcara === "eventMessage"){
        if (isAdmin || !isBotAdmin){                  
        } else {
          m.reply(`*Pesan Acara Terdeteksi*\n\nMaaf Tapi Harus Saya Hapus Karna Si Admin/Owner Mengaktifkan Anti Acara Untuk Chat Ini`)
    return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        } return true
    }
  }
  return true
}