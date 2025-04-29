import { areJidsSameUser } from 'baileys'
let handler = async (m, { conn, participants }) => {
    let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
    let user = m.mentionedJid ? m.mentionedJid[0] : m.quoted.sender;
    if (!user) return m.reply('Tag orang yang mau di Demote!')
        await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
        delay(3000)
}
handler.help = ['promote @tag']
handler.tags = ['group', 'adminry']
handler.command = /^(promote)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))