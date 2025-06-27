export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let sender = global.db.data.chats[m.sender]
  let isSPack = m.mtype
  let hapus = m.key.participant
  let bang = m.key.id
  if (chat.antiStickerPack && isSPack) {
    if(isSPack === "stickerPackMessage"){
        if (isAdmin || !isBotAdmin){                  
        } else {
          m.reply(`*Sticker Pack Terdeteksi*\n\nMaaf Tapi Harus Saya Hapus Karna Si Admin/Owner Mengaktifkan Anti Sticker Pack Untuk Chat Ini`)
    return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        }return true
    }
  }
  return true
}