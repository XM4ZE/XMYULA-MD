let handler = async (m, { conn }) => {
    conn.game = conn.game ? conn.game : {}
    let id = 'susunkata-' + m.chat
    if (!(id in conn.game)) return
    let json = conn.game[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```' + clue + '```\n\n_*Balas Soalnya, Bukan Pesan Ini*_', conn.game[id][0])
}
handler.command = /^suska$/i
handler.limit = true
handler.game = true
handler.onlyprem = true
export default handler