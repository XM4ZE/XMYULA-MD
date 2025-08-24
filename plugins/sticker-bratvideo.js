import {
	sticker
} from '../lib/sticker.js'

let handler = async (m, {
	conn,
	command,
	text
}) => {
	if (!text) return conn.reply(m.chat, 'Masukan Teksnya', m)
	try {
		const res = `https://api.botcahx.eu.org/api/maker/brat-video?text=${encodeURIComponent(text)}&apikey=${btc}`
		let stiker = await sticker(false, res, stickpack, stickauth)
		if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, null)
	} catch (e) {
		m.reply(eror)
		console.log(e)
	}
}
handler.command = /^(brat(video|v))$/i
handler.tags = ['sticker']
handler.help = ['bratvideo']
handler.limit = true;

export default handler;