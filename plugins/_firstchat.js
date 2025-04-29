/*import moment from 'moment-timezone'
let handler = m => m

handler.before = async function(m, {
    conn,
    isROwner,
    isOwner,
    isPrems
}) {

    if (m.chat.endsWith('broadcast')) return;
    if (m.fromMe) return;
    if (m.isGroup) return;
    if (isROwner) return;
    if (isOwner) return;
    let user = global.db.data.users[m.sender]
//    let username = conn.getName(m.sender)
    
    if (new Date - user.pc < 86400000) return
    
    if (user.premium) {
    conn.sendMessage(m.chat, {
            text: `Hai ${ucapan()} *@${m.sender.split('@')[0]}* 👋\n\nAda yang bisa ${info.namebot} bantu?`,
            contextInfo: {
                mentionedJid: [m.sender] }
            }, {})
    user.pc = new Date * 1
    } else {
    conn.sendMessage(m.chat, {
            text: `Hai ${ucapan()} *@${m.sender.split('@')[0]}* 👋\n\nKamu tidak dapat mengakses fitur ❗\nBeli premium untuk mendapatkan mengakses Bot di Private Chat\nowner: https://wa.me/${info.nomorown}\n\n> ${global.wm}`,
            contextInfo: {
                mentionedJid: [m.sender] }
            }, {})
    user.pc = new Date * 1
    }
}

export default handler

function ucapan() {
    const hour_now = moment.tz('Asia/Jakarta').format('HH')
    var ucapanWaktu = 'Pagi kak'
    if (hour_now >= '03' && hour_now <= '10') {
        ucapanWaktu = 'Pagi kak'
    } else if (hour_now >= '10' && hour_now <= '15') {
        ucapanWaktu = 'Siang kak'
    } else if (hour_now >= '15' && hour_now <= '17') {
        ucapanWaktu = 'Sore kak'
    } else if (hour_now >= '17' && hour_now <= '18') {
        ucapanWaktu = 'Selamat Petang kak'
    } else if (hour_now >= '18' && hour_now <= '23') {
        ucapanWaktu = 'Malam kak'
    } else {
        ucapanWaktu = 'Selamat Malam!'
    }
    return ucapanWaktu
}*/