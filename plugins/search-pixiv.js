/**import axios from 'axios';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!args[0]) throw `Contoh : \n.pixiv Eula Lawrence`
try{
const payloads = {
  query: `${args[0]}`,
  enable_nsfw: true,
  num_length: 20,
  tag: ""
};

const { data } = await axios.post(`https://api.itsrose.rest/pixiv/search/`, payloads, {
    headers: { Authorization: `${global.rose}` }
  }).catch((e) => e?.response);
        let random = [['Official Channel','https://whatsapp.com/channel/0029VaL28ZqFSAtCdSU5EX0M','cta_url'],['Official Group','https://chat.whatsapp.com/FJRtTzRKxP8A2wT6fcCW3s','cta_url']]
		let push = [];
        for (let x of data.result.results.sort(() => Math.random() - 0.5))
        push.push(['*Title:* ' + x.title + '\n*Author:* ' + x.author + '\n*ID:* ' + x.id || 'Untitled', global.wm, '', x.url, []])
		await conn.sendButtonSlide(m.chat, `*Search of ${data.result.results.length} Result*`, '', push, m)
        	} catch (e) {
		console.log(e)
		throw `Pencarian Tidak Di Temukan!!!`
	}
}
handler.help = ['pixivimg'].map(v => v + ' query')
handler.tags = ['search', 'nsfw', 'premium']
handler.command = /^(pixiv|pixivimg)$/i
handler.premium = true
handler.nsfw = true

export default handler;**/




import fetch from 'node-fetch';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!args[0]) throw `Contoh : \n.pixiv Eula Lawrence`
try {
const { data: result } = await (await fetch(`https://api.lolicon.app/setu/v2?&r18=1&size=regular&num=10&mode=r18&keyword=${args[0]}`)).json()
		let push = [];
        for (let x of result.sort(() => 0.5 - Math.random()))
        push.push(['*Title:* ' + x.title + '\n*Author:* ' + x.author + '\n*ID:* ' + x.pid || 'Untitled', global.wm, '', x.urls.regular, []])
		await conn.sendButtonSlide(m.chat, `*Search of ${result.length} Result*`, '', push, m)
        	} catch (e) {
	    	throw `Pencarian Tidak Di Temukan!!!`
	    }
}
handler.help = ['pixiv'].map(v => v + ' query')
handler.tags = ['search', 'nsfw', 'premium']
handler.command = /^(pixiv)$/i
handler.register = true 
handler.limit = true
handler.nsfw = true

export default handler;