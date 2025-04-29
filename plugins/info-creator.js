function handler(m) {

	const kontak = {
		"displayName": `${global.info.nameown}`,
		vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN: ${global.info.nameown}\nitem1.TEL;waid=${global.info.nomorown}:${global.info.nomorown}\nitem1.X-ABLabel:My Owner\n\nURL:maximusstoreindonesia@gmail.com\nORG: SEWABOT, PANEL\nEND:VCARD`
	}
	
	let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${conn.getName(conn.user.jid)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${conn.getName(conn.user.jid)}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}

	let doc = {
		contacts: {
			contacts: [kontak]
		},
		contextInfo: {
			forwardedNewsletterMessageInfo: {
            newsletterJid: global.info.channel,
            serverMessageId: null,
            newsletterName: global.info.namechannel,
            }
		}
	}

	conn.sendMessage(m.chat, doc, {
		quoted: fkon
	})
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator)$/i

export default handler;