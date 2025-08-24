import { dare } from '@bochilteam/scraper'

let handler = async (m, { conn, usedPrefix }) => {
    m.reply(await dare())
}
handler.help = ['dare']
handler.tags = ['quotes', 'fun']
handler.command = /^(dare)$/i
handler.limit = true;
handler.register = true;

export default handler;