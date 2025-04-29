import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	try {
	let mmk = await q.download?.()
	if (q.mimetype.includes('audio')) {
	let audio = await toPTT(mmk, 'mp4')
	conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
	} else {
	conn.sendFile(m.chat, mmk, null, wm, m)
	}
	} catch (e) {
      m.reply('Ini bukan pesan viewonce!!')
	}
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'rvo', 'liat', 'readvo']
handler.premium = false
handler.register = false
handler.fail = null

export default handler