let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})(?:[^\d]*(\d{1,3}))?/i

let handler = async (m, { conn, text, isOwner }) => {
    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw 'Link invalid'
    let res = await conn.groupAcceptInvite(code)
    expired = Math.floor(Math.min(9999, Math.max(1, isOwner ? isNumber(expired) ? parseInt(expired) : 0 : 3)))
    m.reply(`Berhasil join grup ${res}${expired ? ` selama ${expired} hari` : ''}`)
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
    var jumlahHari = expired * 1000 * 60 * 60 * 24
    var now = new Date() * 1
    if (now < chats.expired) chats.expired += jumlahHari
    else chats.expired = now + jumlahHari
}
handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['owner']

handler.command = /^join$/i
handler.rowner = true

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))