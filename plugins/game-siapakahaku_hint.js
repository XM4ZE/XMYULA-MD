let handler = async (m, { conn }) => {
    conn.game = conn.game ? conn.game : {}
    let id = 'siapakahaku-' + m.chat
    if (!(id in conn.game)) return
    let json = conn.game[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/ig, '_')
    m.reply('Clue : ' + '```' + clue + '```' + '\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_')
}
handler.command = /^(who)$/i
handler.limit = true
export default handler