let {
	proto
} = (await import('baileys')).default

let handler = async (m, {
	conn,
	text,
	usedPrefix,
	command,
	participants
}) => {
	try {
	if (global.xmaze.some(number => m.sender.includes(number))) {
		let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
		await sendMessage(teks)
		m.reply('Sukses')
	} else {
        m.reply('This command is for *R-OWNER* Only')
       }
	} catch (e) {
		console.log(e)
		m.reply('Gagal')
	}
}

handler.command = /^(ch)$/i
handler.rowner = true

export default handler

function sendMessage(teks) {
	const msg = {
		conversation: teks
	};
	const plaintext = proto.Message.encode(msg).finish();
	const plaintextNode = {
		tag: 'plaintext',
		attrs: {},
		content: plaintext,
	};
	const node = {
		tag: 'message',
		attrs: {
			to: global.info.channel,
			type: 'text'
		},
		content: [plaintextNode],
	};

	conn.query(node);
}