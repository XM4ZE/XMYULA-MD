import { sticker } from '../lib/sticker.js'
var handler = async (m, {
 conn, 
 command
 }) => {
    var error = (`https://telegra.ph/file/12141dd462ecabeed1347.png`)
    try {
        if (command == 'dinokuning' || command == 'sdino') {
        const res = `https://api.botcahx.eu.org/api/sticker/dinokuning?apikey=${global.btc}`
            let stiker = await sticker(false, res, stickpack, stickauth)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, null)
        }
        else if (command == 'stickergenshin' || command == 'sgenshin') {
        const res = `https://api.botcahx.eu.org/api/sticker/paimon?apikey=${global.btc}`
            let stiker = await sticker(false, res, stickpack, stickauth)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, null)
        }
        else if (command == 'spongebob' || command == 'sspongebob') {
        const res = `https://api.botcahx.eu.org/api/sticker/spongebob?apikey=${global.btc}`
            let stiker = await sticker(false, res, stickpack, stickauth)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, null)
        }
        else if (command == 'manusialidi' || command == 'smanusialidi') {
        const res = `https://api.botcahx.eu.org/api/sticker/manusialidi?apikey=${global.btc}`
            let stiker = await sticker(false, res, stickpack, stickauth)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, null)
        }
    } catch (e) {
        console.log(e)
        await conn.sendFile(m.chat, error, 'error.webp', '', m)
    }
}

handler.command = handler.help = ['dinokuning', 'spongebob', 'manusialidi', 'sdino', 'sspongebob', 'smanusialidi', 'stickergenshin', 'sgenshin']
handler.tags = ['sticker']
handler.limit = true;
handler.register = true;

export default handler;