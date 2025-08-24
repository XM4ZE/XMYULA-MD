import { areJidsSameUser } from 'baileys'

let handler = async (m, { conn, args, command }) => {
    let group = m.chat
    const pp = await conn.profilePictureUrl(group, 'image').catch(_ => null) || './src/avatar_contact.png'
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
    if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw 'Hanya bisa dibuka di grup'
    let groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) throw 'groupMetadata is undefined :\\'
    if (!('participants' in groupMetadata)) throw 'participants is not defined :('
    let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) throw 'Aku tidak ada di grup itu :('
    if (!me.admin) throw 'Aku bukan admin T_T'
    let hasil = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
    m.reply(hasil)
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i

export default handler;