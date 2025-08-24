import axios from 'axios';

let handler = async (m, { conn }) => {
  try {
    if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender);
    if (!m.mentionedJid.length) m.mentionedJid.push(m.sender);
    let res = await axios.get('https://api.waifu.pics/sfw/pat');
    let { url } = res.data;
    const buffer = (await axios.get(url, { responseType: 'arraybuffer' })).data;
    const options = { packname: info.namebot, author: wm };
    conn.sendStickerVideo(m.chat, buffer, m, options);
  } catch (e) {
    console.log(e);
  }
};

handler.help = ["pat"]
handler.tags = ["sticker"]
handler.command = /^(pat)$/i;
export default handler;