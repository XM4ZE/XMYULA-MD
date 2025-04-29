import fetch from "node-fetch"
let handler = async(m, { conn, usedPrefix, command, text }) => {
	if  (command == 'tahlil') {
	let res = await(await fetch('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/religion/tahlil.json')).json()
	const sections = Object.values(res.result.data).map((v, index) => ({
        title: v.title, rows: [
           { title: v.title, rowId: usedPrefix + 'tahlil-get ' + index, description: v.arabic }
    ]}))
    const listMessage = {
        text: `乂 *_Doa Tahlil_*`,
        footer: `_Silahkan Pilih Doa Tahlil Dibawah Ini..._`,
        title: '',
        buttonText: 'Tap!',
        sections
    }
    return conn.sendMessage(m.chat, listMessage, { quoted: m })
    }
    if (command == 'tahlil-get') {
    	let res = await(await fetch('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/religion/tahlil.json')).json()
        let { title, arabic, translation } = res.result.data[text]
        let teks = `乂 _*${title}*_
        
_*Arabic:*_ ${arabic}

_*Translation:*_ ${translation}
`
        m.reply(teks)
    }
}
handler.help = ['tahlil']
handler.tags = ['islamic']
handler.command = /^(tahlil|tahlil-get)$/i
export default handler