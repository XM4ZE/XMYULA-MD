import fetch from 'node-fetch'
let handler = async (m, { text }) => {
  let res = await fetch(global.API('https://covid19.mathdro.id', '/api/countries/'+ (text)))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.confirmed) throw 'Negara?'
  if (json.confirmed) m.reply(`
🌏Negara : ${text}
✅Terkonfirmasi : ${json.confirmed.value}
📉Sembuh : ${json.recovered.value}
☠️Meninggal : ${json.deaths.value}
💌Update Info : ${json.lastUpdate}
`.trim())
  else throw json
}
handler.help = ['covid'].map(v => v + ' <negara>')
handler.tags = ['internet']
handler.limit = true;
handler.register = true;
handler.command = /^(corona|covid|covid19)$/i

export default handler;
