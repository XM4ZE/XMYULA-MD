import cheerio from 'cheerio'
import axios from 'axios'
let handler = async (m, { conn, usedPrefix ,command, text }) => {
    let txt = text.split('-')
    if (!txt[0] || !txt[1]) return m.reply(`Masukan Tempat Yang Ingin Dicari\n\nContoh :\n${usedPrefix + command} jakarta-jepang`)
    let { img, desc } = await distance(txt[0].toLowerCase(), txt[1].toLowerCase())
    conn.sendFile(m.chat, img, null, `Jarak ${txt[0]} - ${txt[1]} Adalah ${desc.split('Gambar')[0]}`)
}
handler.help = ['jarak'].map(v => v + ' <place> - <place>')
handler.tags = ['internet']
handler.command = /^jarak|distance$/i
handler.limit = true;
handler.register = true;

export default handler;

async function distance(dari, ke) {
	var html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data
	var $ = cheerio.load(html), obj = {}
	var img = html.split("var s=\'")?.[1]?.split("\'")?.[0]
	obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : ''
	obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim()
	return obj
}