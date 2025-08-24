import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m, { conn }) => {
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing',
        'Pon',
        'Wage',
        'Kliwon',
        'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, {
        weekday: 'long'
    })
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.jid: m.sender
    if (typeof db.data.users[who] == 'undefined') return m.reply('Pengguna tidak ada didalam data base')
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
    let bio = await conn.fetchStatus(who).catch(_ => 'Tidak Ada Bio')
    let { role, premium, money, level, limit, exp, lastclaim, registered, regTime, age } = global.db.data.users[who]
    let username = conn.getName(who)
    let user = db.data.users[who]
    let name = `${user.registered ? user.name : conn.getName(who)}`
    if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`)
    let bioData
    try {
        bioData = await conn.fetchStatus(who)
    } catch (e) {
        console.error('Error fetching bio:', e)
        bioData = null
    }
    
    let bioText = 'Tidak Ada Bio'
    let bioLastUpdate = 'Tidak Diketahui'
    
    if (bioData && Array.isArray(bioData)) {
        const firstBio = bioData[0]?.status
        if (firstBio) {
            bioText = firstBio.status || bioText
            if (firstBio.setAt) {
                bioLastUpdate = moment(firstBio.setAt).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')
            }
        }
    }
    let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` }: {} )}, message: { 'contactMessage': { 'displayName': name, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${name},;;;\nFN:${name},\nitem1.TEL;waid=${who.split('@')[0]}:${who.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp, thumbnail: pp, sendEphemeral: true }}}
    let str = `
\`User Profil\`
👤 • *Username:* ${user.registered ? user.name : ''}
🏷 • *Status:* ${who.split`@`[0] == info.nomorown ? 'Developer' : user.premiumTime >= 1 ? 'Premium User' : user.level >= 1000 ? 'Elite User' : 'Free User'}
📮 • *Bio:* ${bioText}
♻️ • *Bio Update:* ${bioLastUpdate}
📧 • *Tag:* @${who.replace(/@.+/, '')}
📞 • *Number:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
🔗 • *Link:* https://wa.me/${who.split`@`[0]}
🎨 • *Age:* ${user.registered ? age: ''}

\`RPG Profil\`
🔧 • *Role:* ${role}
${rpg.emoticon('level')} • *Level:* ${level}
${rpg.emoticon('exp')} • *Exp:* ${exp}
${rpg.emoticon('money')} • *Money:* ${money}

\`Premium Status\` 
${user.premiumTime > 0 ? "You are a Premium User ✅": "You Are Trash ❌"} ${user.premiumTime > 0 ? `

${clockString(user.premiumTime - new Date() * 1)}`: ''}

\`Registered\`
${user.registered ? 'You have registered ✅' : 'You have not registered yet ❌'}

`.trim()
    await conn.sendFile(m.chat, pp, 'profile.jpeg', str, fkon, false, { mentions: [who] })
}
handler.help = ['profile [@user]']
handler.tags = ['info', 'xp']
handler.command = /^(profile|profil)$/i
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString1(ms) {
    let ye = isNaN(ms) ? '--': Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? '--': Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? '--': Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? '--': Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--': Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--': Math.floor(ms / 1000) % 60
    return ['┊ ', ye, ' *Years 🗓️*\n', '┊ ', mo, ' *Month 🌙*\n', '┊ ', d, ' *Days ☀️*\n', '┊ ', h, ' *Hours 🕐*\n', '┊ ', m, ' *Minute ⏰*\n', '┊ ', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}


function clockString(ms) {
  let years = isNaN(ms) ? '--': Math.floor(ms / 31104000000) % 10
  let months = isNaN(ms) ? '--': Math.floor(ms / 2592000000) % 12
  let days = isNaN(ms) ? '--': Math.floor(ms / 86400000) % 30
  let hours = isNaN(ms) ? '--': Math.floor(ms / 3600000) % 24
  let minutes = isNaN(ms) ? '--': Math.floor(ms / 60000) % 60
  let seconds = isNaN(ms) ? '--': Math.floor(ms / 1000) % 60

  // Sisa dari setiap konversi
  const remainingDays = days % 30;
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  // Buat array hasil
  const durationArray = [];

  // Tambahkan nilai ke array jika tidak sama dengan 0
    durationArray.push({ unit: '\`Premium Time\`' });
  if (years > 0) {
    durationArray.push({ unit: years + ' *tahun*' });
  }
  if (months > 0) {
    durationArray.push({ unit: months + ' *Bulan*' });
  }
  if (days > 0) {
    durationArray.push({ unit: days + ' *Hari*' });
  }
  if (hours > 0) {
    durationArray.push({ unit: hours + ' *Jam*' });
  }
  if (minutes > 0) {
    durationArray.push({ unit: minutes + ' *Menit*' });
  }
  if (seconds > 0) {
    durationArray.push({ unit: seconds + ' *Detik*' });
  }

  // Kembalikan array hasil
  const data = durationArray.map(item => item.unit).join('\n- ')
  return data
}