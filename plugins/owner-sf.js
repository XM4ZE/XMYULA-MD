import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
    if (global.xmaze.some(number => m.sender.includes(number))) {
    if (!text) return;
    if (!m.quoted.text) throw `balas pesan nya!`
    let path = `${text}`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`tersimpan di ${path}`)
    } else {
    m.reply('This command is for *R-OWNER* Only')
    }
}
handler.command = /^(sf)$/i
handler.rowner = true

export default handler