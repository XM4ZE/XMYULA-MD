import { jadwalsholat } from '@bochilteam/scraper'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} semarang`
    try {
    const res = await jadwalsholat(text)
    m.reply(`
Jadwal Sholat *${text}*

${Object.entries(res.today).map(([name, data]) => `*Sholat ${name}:* ${data}`).join('\n').trim()}
`.trim())
  } catch (error) {
     m.reply(error)
     console.log(error)
     }
}
handler.help = ['salat <daerah>']
handler.tags = ['islamic']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i

export default handler