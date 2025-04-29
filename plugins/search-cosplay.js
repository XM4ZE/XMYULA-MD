import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = JSON.parse(fs.readFileSync('./json/cosplay.json'))
    
    let push = [];
        for (let x of res.sort(() => Math.random() - 0.5))
        push.push(['Result of ' + command, global.wm, '', x, []])
		await conn.sendButtonSlide(m.chat, `*All Results ${res.length}.*\n*Take 7 results at random*`, '', push, m)
}
handler.help = ['cosplay']
handler.tags = ['downloader', 'anime', 'search']
handler.command = /^(cosplay)$/i
handler.limit = true;
handler.register = true;

export default handler;