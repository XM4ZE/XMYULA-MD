import { sifat_usaha_bisnis } from '../lib/scrape.js'
let handler = async(m, { conn, args, usedPrefix, command }) => {
    let response = args.join(' ').split('-')
    if (!(response[0] || response[1] || response[2])) return m.reply(`Masukan Tanggal Lahir Kamu!\n\nContoh:\n${usedPrefix + command} 12-12-2000`)
    let res = await sifat_usaha_bisnis(response[0], response[1], response[2])
    if (!res.status) throw res.message
    let cap = `
*Tanggal Lahir:* ${res.message.hari_lahir}
*Usaha:* ${res.message.usaha}
`.trim()
    m.reply(cap)
}
handler.help = ['usaha'].map(v => v + ' <query>')
handler.tags = ['primbon']
handler.command = /^usaha/i
handler.limit = true;
handler.register = true;

export default handler;