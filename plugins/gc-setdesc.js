let handler = async (m, { text }) => {

if(!text) throw 'Isi?'
  
 await conn.groupUpdateDescription(m.chat, text)
  return m.reply("Done.")
}

handler.help = ['setdesc <teks>']
handler.tags = ['group', 'adminry']
handler.command = /^(setdesc|sdesc)$/i

handler.group = true
handler.admin = true

export default handler
