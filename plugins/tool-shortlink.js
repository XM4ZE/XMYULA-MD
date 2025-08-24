import axios from 'axios';

let handler = async (m, { text, conn, args }) => {
  if (!text) throw 'url/link nya mana?\n\n*CONTOH:*\n#tinyurl https://instagram.com'
let url = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`)
let hasil = await url.data
conn.reply(m.chat, 'Result: ' + hasil, m);
 
}

handler.help = ['shortlink'].map(v => v + ' <link>');
handler.tags = ['tools'];
handler.command = /^(shortlink|tinyurl)$/i;
handler.limit = true;
handler.register = true;

export default handler;
