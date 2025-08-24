let handler = async (m, { conn, participants, groupMetadata }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { isBanned, welcome, pembatasan, sWelcome, sBye, sPromote, isDetect, sDemote, antiLinkkick, antiLinkdelete, antiVirtex, antiBadword, antiLinkWa, viewonce, nsfw, rpg, game, delete: del } = global.db.data.chats[m.chat]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `*ID:* 
${groupMetadata.id}
*Name:* 
${groupMetadata.subject}
*Description:* 
${groupMetadata.desc?.toString() || 'unknown'}
*Total Members:*
${participants.length} Members
*Group Owner:* 
@${owner.split('@')[0]}
*Group Admins:*
${listAdmin}
*Group Settings:*
${isBanned ? '✅' : '❌'} Banned
${isDetect ? '✅' : '❌'} Detect
${welcome ? '✅' : '❌'} Welcome
${pembatasan ? '✅' : '❌'} Restrict
${del ? '❌' : '✅'} Anti Delete
${antiLinkkick ? '✅' : '❌'} Anti Link
${antiLinkdelete ? '✅' : '❌'} Anti Link delete
${antiVirtex ? '✅' : '❌'} Anti Virtex
${antiBadword ? '✅' : '❌'} Anti BadWord
${antiLinkWa ? '✅' : '❌'} Anti LinkWa
${viewonce ? '✅' : '❌'} Anti ViewOnce
${nsfw ? '✅' : '❌'} Nsfw
${rpg ? '✅' : '❌'} Rpg Game
${game ? '✅' : '❌'} Game
*Message Settings:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}
`.trim()
    await conn.sendFile(m.chat, pp, null, text, m, null, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

export default handler