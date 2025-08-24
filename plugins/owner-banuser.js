let handler = async (m, {
			conn,
			args
}) => {
if (!args || !args[0]) throw 'Siapa yang mau di banned nih?'
if (global.xmaze.some(number => m.sender.includes(number))) {
let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
				if (!mention) throw 'Tag salah satu lah'
				if (global.xmaze.some(number => m.sender.includes(number))) {
					if (!(mention in global.db.data.users)) throw 'User tidak terdaftar dalam DATABASE!!'
					let user = global.db.data.users[mention]
					if (user.banned) throw 'User telah terbanned!!'
					let txt = (args.length > 1 ? args.slice(1).join(' ') : 'Tanpa Alasan') || 'Tanpa Alasan'
					user.banned = true
					user.BannedReason = txt
					m.reply('Berhasil Banned User!')
					conn.reply(mention, `Kamu Telah DiBanned Owner ${txt ? `Dikarenakan ${txt}` : 'Tanpa Alasan...'}`, null)
		} else {
			m.reply('This command is for *R-OWNER* Only')
		}
    }
}
handler.help = ['oban']
handler.tags = ['owner']
handler.command = /^oban(user)?$/i
handler.owner = true

export default handler