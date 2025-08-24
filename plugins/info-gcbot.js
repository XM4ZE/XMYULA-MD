import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
   let maximus = `
-= *GROUP BOT WHATSAPP* =-

https://chat.whatsapp.com/FJRtTzRKxP8A2wT6fcCW3s
`
    await conn.reply(m.chat, maximus, m)
	} catch (e) {
		console.log(e)
		throw `Fitur Error.`
	}
}

handler.help = ['gcbot']
handler.tags = ['info']
handler.command = /^(gcbot)$/i

handler.register = false
handler.premium = false
handler.limit = false

export default handler;