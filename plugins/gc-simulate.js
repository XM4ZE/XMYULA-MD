let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {
    if (!event) return await conn.reply(m.chat, `Contoh:

${usedPrefix + command} welcome @user
${usedPrefix + command} bye @user`.trim(), m)
    let mentions = text.replace(event, '').trimStart()
    let who = mentions ? conn.parseMention(mentions) : []
    let part = who.length ? who : [m.sender]
    let act = false
    m.reply(wait)
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            act = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            act = 'remove'
            break
/*        case 'promote':
            act = 'promote'
            break
        case 'demote':
            act = 'demote'
            break
        case 'delete':
            deleted = m
            break
*/
        default:
            throw eror
    }
    if (act) return conn.participantsUpdate({
        id: m.chat,
        participants: part,
        action: act
    })
//    return conn.onDelete(m)
}
handler.help = ['simulate <event> [@mention]']
handler.tags = ['adminry']
handler.command = /^simulate$/i
handler.admin = true
handler.group = true
export default handler