
import { toDataURL } from 'qrcode'

let handler = async (m, { conn, text }) => {
if (!text) throw 'Mana Teksnya?'
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '¯\\_(ツ)_/¯', m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <teks>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i
handler.limit = true;
handler.register = true;

export default handler;