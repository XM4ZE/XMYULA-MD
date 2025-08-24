let handler = async(m, { conn, text, usedPrefix, command}) => {
    let xm4ze = await( await fetch(xmenus)).json()
    let thum = xm4ze[Math.floor(Math.random() * xm4ze.length)]
    let pesan = `\`Hai @${m.sender.split('@')[0]}\`\n\n*— XMYULA-MD Script for Sale*\n> *Price:* \`Rp. 150.000\`\n\n*— WhatsApp Channel*\n> https://whatsapp.com/channel/0029VaL28ZqFSAtCdSU5EX0M/214\n\n*— Customer service*\n> *Whatsapp:* [ wa.me/6281283516246 ]\n\n\n> ${wm}`
    conn.sendMessage(m.chat, {
            text: pesan,
            contextInfo: {
                mentionedJid: [m.sender] }
            }, {})
}
handler.tags = ['info']
handler.help = ['script']
handler.command = /^(sc|script)$/i
handler.register = false;
handler.premium = false;

export default handler;