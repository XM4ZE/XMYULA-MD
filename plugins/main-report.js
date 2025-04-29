let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`*CARA REPORT:*\n\n- Screenshot fitur yang error\n\n- Kirim/Repy gambar screenshotannya dengan caption *${usedPrefix}${command} (Jelaskan errornya)*\n\n—\n\n*HOW TO REPORT:*\n\n- Screenshot the error feature\n\n- Send/Reply the screenshot with the caption *${usedPrefix}${command} (Explain the error)*`)
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
    let img = await q.download()
    if (text.length < 10) throw `Laporan terlalu pendek. Jelaskan dengan detail\n\nContoh: Fitur gemini error min. tolong di perbaiki`
    if (text.length > 1000) throw `Laporan terlalu panjang, maksimal 1000 karakter!`
    let teks = `*${command.toUpperCase()}!*\n\nDari : *@${m.sender.split`@`[0]}*\n\nPesan : ${text}\n`

    conn.sendMessage('120363158911429150@g.us', { image: img, caption: teks, contextInfo: { mentionedJid: [m.sender] }})
    m.reply(`_Pesan terkirim kepemilik bot, jika ${command.toLowerCase()} hanya main-main atau mengirim gambar tidak senonoh atau pesan toxic. kamu akan mendapatkan sanksi tegas *BANNED* selamanya_`)
    } else {
        m.reply(`*Reply atau Kirim gambar screenshot errornya dengan caption* \`${usedPrefix}report pesan laporan\``)
    }
}
handler.help = ['report', 'lapor'].map(v => v + ' <teks>')
handler.tags = ['main']
handler.command = /^(report|lapor)$/i
export default handler