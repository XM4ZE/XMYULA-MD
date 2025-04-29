import axios from 'axios'
let handler = async (m, { conn, command }) => {
    let url = await axios.get('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/cecan/cecan.json')
    let image = url.data.getRandom()
    conn.sendFile(m.chat, image, 'cecan.jpeg', null, m, false)
}
handler.help = ['cecan']
handler.tags = ['internet']
handler.command = /^(cecan)$/i
handler.limit = true;
handler.register = true;

export default handler;