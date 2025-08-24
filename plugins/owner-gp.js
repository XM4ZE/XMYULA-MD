import cp, {
	exec as _exec
} from 'child_process'
import {
	promisify
} from 'util'
let exec = promisify(_exec).bind(cp)

let handler = async (m, {
	conn,
	isROwner,
	usedPrefix,
	command,
	text
}) => {
	if (global.xmaze.some(number => m.sender.includes(number))) {
		let ar = Object.keys(plugins)
		let ar1 = ar.map(v => v.replace('.js', ''))
		if (!text) throw `uhm.. where the text?\n\nexample:\n${usedPrefix + command} info`
		if (!ar1.includes(text)) return m.reply(`*🗃️ NOT FOUND!*\n==================================\n\n${ar1.map(v => ' ' + v).join`\n`}`)
		let o
		try {
			o = await exec('cat plugins/' + text + '.js')
		} catch (e) {
			o = e
		} finally {
			let {
				stdout,
				stderr
			} = o
			if (stdout.trim()) m.reply(stdout)
			if (stderr.trim()) m.reply(stderr)
		}
	} else {
		m.reply('This command is for *R-OWNER* Only')
	}
}
handler.command = /^(gp|getplugins)$/i
handler.rowner = true

export default handler