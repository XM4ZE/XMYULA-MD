import api from 'api-dylux';

let handler = async (m, { conn, args, command, usedprefix }) => {
    let chat = db.data.chats[m.chat]
    if (!args[0]) throw `*Linknya Mana?*`
     try {
    let maxim = await api.xvideosdl(args[0])
     m.reply(wait)
    let capt = `
*INFO FILE*

Name: ${maxim.title}
Views: ${maxim.views}
Vote: ${maxim.vote}
Like/Dislike: ${maxim.likes}/${maxim.deslikes}
Size: ${maxim.size}`
    await conn.sendFile(m.chat, maxim.url_dl, null, capt, m)
        } catch (e) {
        m.reply(eror)
    }
}
handler.help = ['xvideosdl <url>']
handler.tags = ['nsfw', 'downloader']
handler.command = /^xvideosdl$/i
handler.limit = true
handler.nsfw = true

export default handler