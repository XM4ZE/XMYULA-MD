let handler = async (m, {
	participants
}) => {
	if (global.xmaze.some(number => m.sender.includes(number))) {
		global.db.data.chats[m.chat].isBanned = true
		m.reply('Done!')
	} else {
		m.reply('This command is for *R-OWNER* Only')
	}
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^(banchat|bnc)$/i

handler.rowner = true

export default handler