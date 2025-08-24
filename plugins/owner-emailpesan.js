
let handler = async(m, { conn, text, usedPrefix }) => {
let [number, pesan] = text.split `|`
let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : number ? number.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    if (!number) return conn.reply(m.chat, 'Silahkan masukan nomor yang akan dikirim', m)
    if (!pesan) return conn.reply(m.chat, 'Silahkan masukan pesannya', m)
    if (text > 500) return conn.reply(m.chat, 'Teks Kepanjangan!', m)
    
    let user = global.db.data.users[m.sender]

    let korban = `${number}`
    var nomor = m.sender
    let spam1 = `*「 📧 EMAIL 」*\n\n📫Dari : @${m.sender.replace(/@.+/, '')}\n💬Pesan : ${pesan}\n\n ${global.wm}`

    conn.reply(mention, spam1, null, { mentions: [m.sender]})

    let logs = `[!] Berhasil mengirim pesan wa ke nomor ${korban}`
    conn.reply(m.chat, logs, m)
}
handler.help = ['email']
handler.tags = ['owner']
handler.command = /^(email)$/i
handler.owner = true
export default handler 
