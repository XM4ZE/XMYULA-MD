import fetch from 'node-fetch'

let handler = async (m, { text }) => {
	if (!text) throw 'Input Query'
	let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
	let { objects } = await res.json()
	if (!objects.length) throw `Query "${text}" not found :/`
	let txt = objects.map(({ package: pkg }) => {
		return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
	}).join`\n\n`
	m.reply(txt)
}
handler.help = ['npmsearch']
handler.tags = ['internet']
handler.command = /^(npmjs|npmsearch)$/i
handler.limit = true;
handler.register = true;

export default handler;