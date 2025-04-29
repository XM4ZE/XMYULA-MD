let handler = async (m, { conn, command, text, args }) => {
    if (global.xmaze.some(number => m.sender.includes(number))) {
    if (!text) throw 'Berapa Limit?'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag??'
    let users = global.db.data.users
    users[who].limit += 1000
    conn.reply(m.chat, 'Sukses', m)
    } else {
        m.reply('This command is for *R-OWNER* Only')
   }
}
handler.help = ['addlimit']
handler.tags = ['owner']
handler.command = /^addlimit(user)?$/i
handler.rowner = true

export default handler