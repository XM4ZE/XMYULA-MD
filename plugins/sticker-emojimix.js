import { Sticker } from 'wa-sticker-formatter'
import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text || !text.includes('+')) throw `Usage : ${usedPrefix + command} emoji1|emoji2\n\nExample: *${usedPrefix + command} 😅+🤔*`
    let [l, r] = text.split`+`
    if (!l) throw 'emoji1 tidak boleh kosong'
    if (!r) throw 'emoji2 tidak boleh kosong'
    const url = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(l)}_${encodeURIComponent(r)}`)
    if (!url.ok) throw await url.text()
    let json = await url.json()
    if (!json.results) throw 'Error!'
    try {
    	let res = json.results[0].url
    	let stiker = await createSticker(res, false, stickpack, stickauth)
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } catch (e) {
        console.log(e)
        m.reply(eror)
    }
}

handler.help = ['emojimix <1>|<2>']
handler.tags = ['tools']
handler.command = /^(emojimix)$/i
handler.limit = true;
handler.register = true;

export default handler;

async function createSticker(res, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: 'full',
		pack: stickpack,
		author: stickauth,
		quality
	}
	return (new Sticker(res ? res : url, stickerMetadata)).toBuffer()
}