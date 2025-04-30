import api from "api-dylux";

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let chat = db.data.chats[m.chat]
    if (!text) throw `url nya mana?\n\ncontoh:\n${usedPrefix + command} https://www.xnxx.com/video-wdsipd3/jealous_mother_blows_son_uncensored`
    if (!/^https?:\/\/(www\.)?xnxx\.com/.test(text)) throw `url salah!\n\ncontoh:\n${usedPrefix + command} https://www.xnxx.com/video-wdsipd3/jealous_mother_blows_son_uncensored`
    let res = await api.xnxxdl(text)
     m.reply(wait)
    let capt = `*INFO DATA*
    
Judul: ${res.title}
Durasi: ${res.duration}
Kualitas: ${res.quality}
Ukuran: ${res.size}`
    conn.sendFile(m.chat, res.url_dl, "mtype.mp4", capt, m)
}
handler.help = ['xnxx'].map(v => v + ' <url>')
handler.tags = ['nsfw', 'downloader']
handler.command = /^(xnxx)$/i
handler.nsfw = true
handler.limit = true

export default handler