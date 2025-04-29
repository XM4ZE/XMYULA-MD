import { rejeki_hoki_weton } from '../lib/scrape.js'
let handler = async(m, { conn, args, usedPrefix, command }) => {
    let response = args.join(' ').split('-')
    if (!(response[0] || response[1] || response[2])) return m.reply(`Masukan Tanggal Lahir Kamu!\n\nContoh:\n${usedPrefix + command} 12-12-2000`)
    let res = await rejeki_hoki_weton(response[0], response[1], response[2])
    if (!res.status) throw res.message
    let cap = `
*Tanggal Lahir:* ${res.message.hari_lahir}
*Rejeki:* ${res.message.rejeki}
`.trim()
    m.reply(cap)
}
handler.help = ['rejeki'].map(v => v + ' <query>')
handler.tags = ['primbon']
handler.command = /^rejeki/i
handler.limit = true;
handler.register = true;

export default handler;