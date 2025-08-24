// MADE BY KORONEOFC (JANGAN DIHAPUS !!!)


import { Jimp } from "jimp"
import uploadFile from "../lib/uploadFile.js"

let handler = async (m, { conn, usedPrefix }) => {
	
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw "where the media?"

let media = await q.download()
let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isMedia ? uploadFile : uploadFile)(media)

let source = await Jimp.read(await link)
let height = await source.bitmap.height
let width = await source.bitmap.width

m.reply(`_*RESOLUTION :*_ ${width} x ${height}

> ᴡɪᴅᴛʜ : ${width}
> ʜᴇɪɢʜᴛ : ${height}

> ʟɪɴᴋ : ${link}`)
}
handler.help = ['cekresolution <reply | caption>']
handler.tags = ['tools']
handler.command = /^(cekreso(lution)?)$/i
handler.limit = true;
handler.register = true;

export default handler;