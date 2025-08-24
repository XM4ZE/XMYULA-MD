import { areJidsSameUser } from 'baileys'
let handler = async (m, { conn, participants }) => {
    let usr = m.quoted ? [m.quoted.sender] : m.mentionedJid
    let users = usr.filter(u => !areJidsSameUser(u, conn.user.id))
    let kickedUser = []
    for (let user of users)
        if (user.endsWith('@s.whatsapp.net')) {
            const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
            kickedUser.concat(res)
            await delay(1 * 1000)
        }
    m.reply(`📮Succes kick ${kickedUser.map(v => '@' + v.split('@')[0])}`, null, { mentions: kickedUser })

}
handler.help = ['okick'].map(v => v + ' @user')
handler.tags = ['owner']
handler.command = /^(okick)$/i
handler.owner = true
handler.group = true
handler.botAdmin = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))