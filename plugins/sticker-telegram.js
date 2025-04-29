import fetch from "node-fetch";
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `🚩 *Example:* ${usedPrefix + command} https://t.me/addstickers/a1_2027683453_by_YogaWaifuBot`;
    if (!text.match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `🚩 *Example:* ${usedPrefix + command} https://t.me/addstickers/a1_2027683453_by_YogaWaifuBot`;
    m.reply(wait)
    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/download/telesticker?url=${text}&apikey=${btc}`)).json()
        let { result } = res;
        let total = result.length;
        let est = total * 0.5;
        m.reply(`Processing ${total} stickers`);   
        for (var i = 0; i < result.length; i++) {
            var url = result[i].url;
            await sleep(10000)
            let stiker = await sticker(false, url, global.packname, global.author)
            await conn.sendMessage(m.chat, {sticker: stiker })
        }  
        await conn.reply(m.chat, `Total ${total} stickers successfully sent`, m);
    } catch (e) {
        throw `🚩 ${eror}`
    }
};

handler.help = ['telesticker'];
handler.command = /^(telesticker|stele)$/i;
handler.tags = ['sticker'];
handler.premium = true;
handler.limit = true;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}