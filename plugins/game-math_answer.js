let handler = m => m
handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = 'math-' + m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^Berapa hasil dari/i.test(m.quoted.text)) return !0
    this.game = this.game ? this.game : {}
    if (!(id in this.game)) return conn.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.game[id][0].id) {
        let math = JSON.parse(JSON.stringify(this.game[id][1]))
        if (m.text == math.result) {
            global.db.data.users[m.sender].exp += math.bonus
            clearTimeout(this.game[id][3])
            delete this.game[id]
            conn.reply(m.chat, `*Jawaban Benar!*\n+${math.bonus} XP`, m)
        } else {
            if (--this.game[id][2] == 0) {
                clearTimeout(this.game[id][3])
                delete this.game[id]
                conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${math.result}*`, m)
            } else m.reply(`*Jawaban Salah!*\nMasih ada ${this.game[id][2]} kesempatan`)
        }
    }
    return !0
}

export default handler