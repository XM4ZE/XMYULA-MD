const timeout = 1800000

let handler = async (m, { conn, usedPrefix, text }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastberkebon)
    let _timers = (timeout - __timers)
    let timers = clockString(_timers)
    let user = global.db.data.users[m.sender]
    let pisang = 100 - user.bibitpisang
    let anggur = 100 - user.bibitanggur
    let mangga = 100 - user.bibitmangga
    let jeruk = 100 - user.bibitjeruk
    let apel = 100 - user.bibitapel
    let kerja = 'Berkebun'
    let id = m.chat
    conn.misi = conn.misi ? conn.misi: {}
    if (id in conn.misi) {
        conn.reply(m.chat, `Selesaikan Misi ${conn.misi[id][0]} Terlebih Dahulu`, m)
        throw false
    }
    let caption = `
📮 Kamu Membutuhkan Bibit:
${user.bibitpisang < 100 ? `
${rpg.emoticon('bibitpisang')} BibitPisang: ${pisang}`: ''} ${user.bibitanggur < 100 ? `
${rpg.emoticon('bibitanggur')} BibitAnggur: ${anggur}`: ''} ${user.bibitmangga < 100 ? `
${rpg.emoticon('bibitmangga')} BibitMangga: ${mangga}`: ''} ${user.bibitjeruk < 100 ? `
${rpg.emoticon('bibitjeruk')} BibitJeruk: ${jeruk}`: ''} ${user.bibitapel < 100 ? `
${rpg.emoticon('bibitapel')} BibitApel: ${apel}`: ''}
`.trim()
    if (new Date - user.lastberkebon > 1800000) {
        if (user.bibitpisang >= 100 && user.bibitanggur >= 100 && user.bibitmangga >= 100 && user.bibitapel >= 100 && user.bibitjeruk >= 100) {
            let hasil1 = Math.floor(Math.random() * 100)
            let hasil2 = Math.floor(Math.random() * 100)
            let hasil3 = Math.floor(Math.random() * 100)
            let hasil4 = Math.floor(Math.random() * 100)
            let hasil5 = Math.floor(Math.random() * 100)

            let caption = `⌛ Hasil Panen Kamu

${rpg.emoticon('pisang')} Pisang: ${hasil1}
${rpg.emoticon('anggur')} Anggur ${hasil2}
${rpg.emoticon('mangga')} Mangga: ${hasil3}
${rpg.emoticon('jeruk')} Jeruk: ${hasil4}
${rpg.emoticon('apel')} Apel: ${hasil5}
`
            user.pisang += hasil1
            user.anggur += hasil2
            user.mangga += hasil3
            user.jeruk += hasil4
            user.apel += hasil5
            user.bibitpisang -= 100
            user.bibitanggur -= 100
            user.bibitmangga -= 100
            user.bibitjeruk -= 100
            user.bibitapel -= 100

            conn.misi[id] = [
                kerja,
                setTimeout(() => {
                    delete conn.misi[id]
                }, 20000)
            ]

            setTimeout(() => {
                m.reply(caption.trim())
            }, 20000)

            setTimeout(() => {
                m.reply('Sedang Menanam Bibit...')
            }, 0)
            user.lastberkebon = new Date * 1
        } else m.reply(caption)
    } else conn.reply(m.chat, `Mohon Menunggu Selama ${timers} Untuk Berkebun Kembali...`, m)
}
handler.help = ['berkebun']
handler.tags = ['rpg']
handler.command = /^(berkebun|berkebon)/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}