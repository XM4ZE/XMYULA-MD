import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*wa/i.test(m.quoted.text) || /.*wa/i.test(m.text))
        return !0
    this.tebakanime = this.tebakanime ? this.tebakanime : {}
    if (!(id in this.tebakanime)) return m.reply('❗Soal Itu Telah Berakhir')
    if (m.quoted.id == this.tebakanime[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakanime[id][1]))
        if (['.wa', 'Bantuan', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
            global.db.data.users[m.sender].exp += this.tebakanime[id][2]
            await this.reply(m.chat, `*🎉Benar!* 💥+${this.tebakanime[id][2]} XP`, m)
            clearTimeout(this.tebakanime[id][3])
            delete this.tebakanime[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*💢Dikit Lagi!*`)
        else m.reply(`*🚫Salah!*`)
    }
    return !0
}
export const exp = 0