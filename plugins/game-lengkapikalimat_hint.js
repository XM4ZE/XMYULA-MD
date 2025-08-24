let handler = async (m, { conn }) => {
    conn.game = conn.game ? conn.game : {}
    let id = 'lengkapikalimat-' + m.chat
    if (!(id in conn.game)) throw false
    let json = conn.game[id][1]
    m.reply('Clue : ' + '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```' + '\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_')
}
handler.command = /^hlen$/i
handler.limit = true
export default handler