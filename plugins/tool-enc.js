import JavaScriptObfuscator from 'javascript-obfuscator'

let handler = async (m, { conn, text }) => {
if (!text) throw `[!] Masukan textnya`
let res = JavaScriptObfuscator.obfuscate(text)
conn.reply(m.chat, res.getObfuscatedCode(), m)
}
handler.help = ['encrypt <code>']
handler.tags = ['tools']
handler.command = /^enc(rypt)?$/i
handler.limit = true;
handler.register = true;

export default handler;