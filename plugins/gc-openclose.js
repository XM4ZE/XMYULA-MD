let handler = async (m, {
	conn,
	usedPrefix,
	command,
	text
}) => {

	switch (command) {
		case 'setopenclose':
		case 'setautooc': {
			if (!text) return m.reply(`How to use:\n\n${usedPrefix + command} <timeclose> <timeopen>\n${usedPrefix + command} 22:30 04:00`)
			let [close, open] = text.split(' ')

			if (!/^\d{1,2}:\d{1,2}$/.test(close) || !/^\d{1,2}:\d{1,2}$/.test(open)) {
				return m.reply('Incorrect time format. Use HH:MM format (eg: 22:30)');
			}

			let close1 = close.split(':')
			if (close1[0] > 24) return m.reply('Closing Time Cannot be set beyond 24')
			if (close1[1] > 59) return m.reply('Closing Minutes Cannot be set beyond 59')

			let open1 = open.split(':')
			if (open1[0] > 24) return m.reply('Opening Hours Cannot be set beyond 24')
			if (open1[1] > 59) return m.reply('Opening Minutes Cannot be set beyond 59')

			let chat = global.db.data.chats[m.chat]
			chat.openTime = open;
			chat.closeTime = close;
			chat.ocStatus = true;
			m.reply('*Successfully set auto open close of this group.*')
		}
		break
		case 'stopopenclose':
		case 'stopautooc': {
			global.db.data.chats[m.chat].ocStatus = false
			m.reply('*Successfully turned off auto open close of this group*')
		}
	}
}
handler.help = ['setopenclose', 'setautooc', 'stopopenclose', 'stopautooc']
handler.tags = ['group']
handler.command = ['setopenclose', 'setautooc', 'stopopenclose', 'stopautooc']
handler.group = true;
handler.admin = true;

export default handler;