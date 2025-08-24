export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let sender = global.db.data.chats[m.sender]
  let isDoc = m.mtype
  let hapus = m.key.participant
  let bang = m.key.id
  if (chat.antiDoc && isDoc) {
    if(isDoc === "documentMessage"){
        if (isAdmin || !isBotAdmin){                  
        } else {
          m.reply(`*## Dilarang Mengirim File!*\n\n*Bahaya Mengapa Anda Tidak Boleh Mengirim File:*\n\n* *Virus dan Malware:* File yang dikirim dapat mengandung virus, malware, atau program jahat lainnya yang dapat merusak perangkat Anda dan mencuri data pribadi Anda.\n* *Phishing:* File yang dikirim dapat berupa jebakan phishing yang dirancang untuk mencuri informasi sensitif Anda, seperti kredensial login atau informasi kartu kredit.\n\n> *Penting!* Berhati-hatilah dalam menerima dan mengirimkan file. Pastikan Anda mengetahui sumber file tersebut dan hanya mengirim file ke orang yang terpercaya.`)
    return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        } 
        return true
    }
  }
  return true
}