import uploadFile from '../lib/uploadFile.js'
import { Sticker } from 'wa-sticker-formatter'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    try {
    let img = await q.download()
    let url = await uploadFile(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah ? bawah : ' ')}/${encodeURIComponent(atas ? atas : ' ')}.png?background=${url}`
    let stiker = await createSticker(meme, false, '', '')
	await conn.sendFile(m.chat, stiker, '', '', m, '')
	   } catch (e) {
			console.log(e)
			m.reply(eror)
		}
}
handler.help = ['smeme <text bawah>|<text atas>']
handler.tags = ['sticker']
handler.command = /^(smeme)$/i
handler.limit = true;
handler.register = true;

export default handler;

async function createSticker(img, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: 'full',
		pack: stickpack,
		author: stickauth,
		quality
	}
	return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}