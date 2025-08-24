let { MessageType } = (await import('baileys')).default
let handler = async (m, { conn, text, usedPrefix }) => {
  if (global.xmaze.some(number => m.sender.includes(number))) {
  function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }
  
  if (!text) return conn.reply(m.chat, `*『 F A I L E D 』*\n\n${usedPrefix}unprem @tag/nomor|days\n\n*Example:* ${usedPrefix}unprem 6289654360447|99`, m)
  text = no(text) + "@s.whatsapp.net"
  global.db.data.users[text].premium = false
  global.db.data.users[text].premiumTime = 0
  conn.reply(m.chat,`*Berhasil menghapus akses premium untuk @${text.split('@')[0]}.*`,m,{ contextInfo: { mentionedJid: [text] } })
	} else {
        m.reply('This command is for *R-OWNER* Only')
  }
}
handler.help = ['unprem']
handler.tags = ['owner']
handler.command = /^(unprem)$/i
handler.owner = true
handler.fail = null
export default handler