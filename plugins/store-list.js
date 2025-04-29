import moment from 'moment-timezone';

let handler = async (m, { conn, noPrefix, command, groupMetadata }) => {
	let msgs = db.data.chats[m.chat].listStr
	let msg = (Object.entries(db.data.chats[m.chat].listStr).map(([nama, isi]) => { return { nama, ...isi } })).map(v => v.nama)
	let name = msg.sort();
	let ucapanni = ucapan()
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wktuwib = `_Jam ${wibh} : ${wibm} Menit_`
	let teks = name.map(v => {
            return `
○ ${v.toUpperCase()}
`.trim()
        }).filter(v => v).join('\n')
    let cap = `${ucapanni} @${m.sender.split`@`[0]}\nDi bawah ini adalah list Store\n*${groupMetadata.subject}*\n\nUntuk melihat List\nKetik *Tulisan* di bawah ini\n*——————— 𝙻𝙸𝚂𝚃 𝚂𝚃𝙾𝚁𝙴 ———————*\n\n${teks}\n`
	if (msg[0]) return await conn.sendMessage(m.chat, {
                            text: cap,
                            contextInfo: {
                            mentionedJid: [m.sender],
                            }})
	else throw `\nBelum Ada List Yang Ditambahkan Admin\nketik *.addlist <text>* untuk menambahkan daftar menu.\n\nJika kamu ingin melihat allfitur tulis *.allmenu*`
}
handler.help = ['list']
handler.tags = ['store']
handler.customPrefix = /^(menu|list)$/i
handler.command = new RegExp
handler.group = true

export default handler

function ucapan() {
        const hour_now = moment.tz('Asia/Jakarta').format('HH')
        var ucapanWaktu = '🌅 Pagi'
        if (hour_now >= '03' && hour_now <= '10') {
          ucapanWaktu = '🌅 Pagi'
        } else if (hour_now >= '10' && hour_now <= '15') {
          ucapanWaktu = '☀️ Siang'
        } else if (hour_now >= '15' && hour_now <= '18') {
          ucapanWaktu = '🌇 Sore'
        } else if (hour_now >= '18' && hour_now <= '23') {
          ucapanWaktu = '🌃 Malam'
        } else {
          ucapanWaktu = '🌃 Malam'
        }	
        return ucapanWaktu
}