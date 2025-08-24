import { chord } from "@bochilteam/scraper"
let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `_Masukan Format Dengan Benar!_\n\n_Contoh_\n${usedPrefix + command} mantra hujan`
	let result = await chord(text)
	let teks = `_*乂 Title:*_ ${result.title}
_*❃ Artist:*_ ${result.artist}
_*❃ Artist Url:*_ ${result.artistUrl}

_*❃ Chord:*_ 
${result.chord}
`
m.reply(teks)
}
handler.help = ['kuncigitar']
handler.tags = ['internet']
handler.command = /^(kuncigitar|chord)$/i
handler.limit = true;
handler.register = true;

export default handler;