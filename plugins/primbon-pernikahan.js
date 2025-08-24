import { tanggal_pernikahan } from '../lib/scrape.js'
let handler = async(m, { conn, text, args, usedPrefix, command }) => {
  let response = args.join(' ').split('-')
  if (!(response[0] || response[1] || response[2])) return m.reply(`Masukan Tanggal Pernikahan Dengan Benar!\n\nContoh:\n${usedPrefix + command} 12-12-2000`)
  let res = await tanggal_pernikahan(response[0], response[1], response[2])
  if (!res.status) throw res.message
  let cap = `
*Tanggal:* ${res.message.tanggal}
*Karakteristik:* ${res.message.karakteristik}
`.trim()
    m.reply(cap)
}
handler.help = ['pernikahan <date>']
handler.tags = ['primbon']
handler.command = /^pernikahan/i
handler.limit = true;
handler.register = true;

export default handler;