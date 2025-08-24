import {
	exec
} from 'child_process'

let handler = async (m, {
	conn,
	isROwner,
	text
}) => {
	if (global.xmaze.some(number => m.sender.includes(number))) {
		if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
		if (global.conn.user.jid == conn.user.jid) {
			await m.reply('```R E S T A R T . . .```')
			restartIndexJs();

			process.exit(0);
		} else throw 'Meledakkkkk'
	} else {
		m.reply('This command is for *R-OWNER* Only')
	}
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(res(tart)?)$/i
handler.rowner = true

export default handler

function restartIndexJs() {
	exec('node index.js', (error, stdout, stderr) => {
		if (error) {
			console.error(`Error restarting index.js: ${error}`);
			return;
		}
		console.log('index.js restarted successfully.');
	});
}