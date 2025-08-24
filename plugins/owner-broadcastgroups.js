/*let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let chats = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
	let img, q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	if (!text) throw `teks nya mana ?`
	if (mime) img = await q.download?.()
	conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
	let teks = command.includes('meme') ? `${text}` : `${text}`
	for (let id of chats) {
		try {
			if (/image|video|viewOnce/g.test(mime)) {
				if (command.includes('meme')) await conn.sendFile(id, img, '', teks)
				else await conn.sendFile(id, img, '', teks)
			} else await conn.sendMessage(id, teks)
		} catch (e) {
			console.log(e)
		}
		await delay(3000)
	}
	await m.reply('Selesai Broadcast All Group Chat :)')
}*/

let handler = async (m, { conn, text }) => {
  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
  for (let id of groups) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : teks ), true).catch(_ => _)
        await delay(7000)
        
  m.reply('Selesai Broadcast All Group :)')
}

handler.menuowner = ['bcgroup']
handler.tagsowner = ['owner']
handler.command = /^((bc|broadcast)(gc|gro?ups?)(meme)?)$/i

handler.owner = true

export default handler

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
