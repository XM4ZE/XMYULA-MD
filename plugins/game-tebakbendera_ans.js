import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = 'tebakbendera-' + m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*teben/i.test(m.quoted.text) || /.*teben/i.test(m.text))
        return !0
    this.game = this.game ? this.game : {}
    if (!(id in this.game))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.game[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.game[id][3])
            delete this.game[id]
            return m.reply('*Yah Menyerah :( !*')
        }
        let json = JSON.parse(JSON.stringify(this.game[id][1]))
        //m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.game[id][2]
            m.reply(`*Benar!*\n+${this.game[id][2]} XP`)
            clearTimeout(this.game[id][3])
            delete this.game[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            m.reply(`*Salah!*`)
    }
    return !0
}
export const exp = 0