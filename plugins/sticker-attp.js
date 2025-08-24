import { Sticker } from 'wa-sticker-formatter'
let handler = async (m, { conn, command, text }) => {
	try {
	if (!text) return conn.reply(m.chat, 'Masukan Teksnya', m)
	let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
	const res = `https://api.botcahx.eu.org/api/maker/attp?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${btc}`
	let stiker = await createSticker(res, false, stickpack, stickauth)
	conn.sendFile(m.chat, stiker, 'maze.webp', '', m, false)
	} catch (e) {
		m.reply(eror)
		}
}
handler.command = /^(attp)$/i
handler.tags = ['sticker']
handler.help = ['attp']
handler.limit = true;
handler.register = true;

export default handler;

async function createSticker(res, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: 'full',
		pack: stickpack,
		author: stickauth,
		quality
	}
	return (new Sticker(res ? res : url, stickerMetadata)).toBuffer()
}