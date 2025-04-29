let handler = async (m, { text, conn, usedPrefix, command }) => {
    if (global.xmaze.some(number => m.sender.includes(number))) {
	let why = `*Contoh:*\n${usedPrefix + command} @${m.sender.split("@")[0]}`
	let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
	if (!who) conn.reply(m.chat, why, m, { mentions: [m.sender] })
	let res = [];
	console.log(command)
	switch (command) {
		case "blok":
		case "block":
			if (who) await conn.updateBlockStatus(who, "block").then(() => {
				res.push(who);
			})
			else conn.reply(m.chat, why, m, { mentions: [m.sender] })
		break
        case "unblok":
        case "unblock":
        	if (who) await conn.updateBlockStatus(who, "unblock").then(() => {
				res.push(who);
			})
			else conn.reply(m.chat, why, m, { mentions: [m.sender] })
        break
	}
	if (res[0]) conn.reply(m.chat, `Sukses ${command} ${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}`, m, { mentions: res })
    } else {
        m.reply('This command is for *R-OWNER* Only')
  }
}
handler.help = ["block", "unblock"]
handler.tags = ["owner"]
handler.command = /^(block|unblock)$/i
handler.owner = true

export default handler