let handler = async (m, { conn, text }) => {
    let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    if (!mention) throw 'Tag salah satu lah'
    if (!(mention in global.db.data.users)) throw 'User tidak terdaftar dalam DATABASE!!'
    let user = global.db.data.users[mention]
    if (!user.banned) throw 'User tidak Terbanned!!'
    user.banned = false
    user.BannedReason = ''
    await m.reply('Berhasil Unbanned')
    conn.reply(mention, 'Kamu telah di Unbanned!!', null)
}
handler.help = ['ounban']
handler.tags = ['owner']
handler.command = /^ounban(user)?$/i
handler.owner = true
export default handler
