import axios from 'axios'
let handler = async (m, { conn }) => {
    let url = await axios.get('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/cecan/cogan.json')
    let image = url.data.getRandom()
    conn.sendFile(m.chat, image, 'cogan.jpeg', null, m, false)
}
handler.help = ['cogan']
handler.tags = ['internet']
handler.command = /^(cogan)$/i
handler.limit = true;
handler.register = true;

export default handler;