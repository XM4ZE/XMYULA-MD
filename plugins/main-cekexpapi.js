import fetch from 'node-fetch'

let handler = async (m, { conn, command, text }) => {
if (command == 'cekexpbtc' )  {
    if (!text) throw `Masukan username`
    let api1 = await fetch(`https://api.botcahx.eu.org/api/checkexp?username=${text}`)
    let body = await api1.text()
    m.reply(body)  
  }
}          
handler.command = ['cekexpbtc']
handler.help = ['cekexpbtc <username>'];
handler.tags = ['main'];

export default handler;