import { tafsir_mimpi } from '../lib/scrape.js'
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Mimpi Yang Ingin Dicari!\n\nContoh:\n${usedPrefix + command} buaya`)
    let res = await tafsir_mimpi(text)
    if (!res.status) throw res.message
    let cap = `
*Mimpi:* ${res.message.mimpi}
*Arti:* ${res.message.arti}
`.trim()
    m.reply(cap)
}
handler.help = ['artimimpi'].map(v => v + ' <query>')
handler.tags = ['primbon']
handler.command = /^artimimpi$/i
handler.limit = true;
handler.register = true;

export default handler;