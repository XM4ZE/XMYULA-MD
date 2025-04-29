let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let __timers = (new Date - user.lastmisi)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    let id = m.sender
    let kerja = 'Rob'
    conn.misi = conn.misi ? conn.misi : {}
    if (id in conn.misi) {
        conn.reply(m.chat, `Selesaikan Misi ${conn.misi[id][0]} Terlebih Dahulu`, m)
        throw false
    }
    if (user.health < 80) return m.reply('Anda Harus Memiliki Minimal 80Health')
    if (new Date - global.db.data.users[m.sender].lastmisi > 3600000) {
        let rndm1 = Math.floor(Math.random() * 10)
        let rndm2 = Math.floor(Math.random() * 10)
        
        let ran1 = (rndm1 * 100000)
        let ran2 = (rndm2 * 1000)

        let jln = `
🏘️          🚗

✔️ Mengincar target....
`.trim()

        let jln2 = `
🏘️     🚶

➕ Memulai aksi....
`.trim()

        let jln3 = `
🏘️

➕ Merampok....
`.trim()

        let jln4 = `
🚗



🏘️🚓

➕ 💹Berhasil kabur....
`.trim()

        let hsl = `
*—[ Hasil rob ]—*

➕ 💹 Uang = [ ${ran1} ]
➕ ✨ Exp = [ ${ran2} ]
➕ 📦 Rob Selesai = +1

Dan health anda berkurang -80
`.trim()
        user.money += ran1
        user.exp += ran2
        user.health -= 80

		conn.misi[id] = [
        kerja,
        setTimeout(() => {
            delete conn.misi[id]
        }, 27000)
    	]
    
        setTimeout(() => {
            m.reply(hsl)
        }, 27000)

        setTimeout(() => {
            m.reply(jln4)
        }, 25000)

        setTimeout(() => {
            m.reply(jln3)
        }, 20000)

        setTimeout(() => {
            m.reply(jln2)
        }, 15000)

        setTimeout(() => {
            m.reply(jln)
        }, 10000)

        setTimeout(() => {
            m.reply('🔍Mencari Rumah.....')
        }, 0)
        user.lastmisi = new Date * 1
    } else m.reply(`Silahkan Menunggu Selama ${timers}, Untuk Menyelesaikan Misi Kembali`)
}
handler.help = ['rob']
handler.tags = ['rpg']
handler.command = /^(rob|robery)$/i
handler.level = 10
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