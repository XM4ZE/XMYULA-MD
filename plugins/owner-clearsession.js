import { tmpdir } from 'os'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
if (global.xmaze.some(number => m.sender.includes(number))) {

conn.reply(m.chat, 'Succes !', m)

const session = [tmpdir(), join(__dirname, '../sessions')]
  const filename = []
  session.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    if (file == 'creds.json') return
    unlinkSync(file)
})
	} else {
        m.reply('This command is for *R-OWNER* Only')
  }
}
handler.help = ['clearsession']
handler.tags = ['owner']
handler.command = /^(clearsesi|clearsession)$/i

handler.rowner = true

export default handler