import moment from 'moment-timezone'
import fs from 'fs'
export async function all(m) {
    let setting = global.db.data.settings[this.user.jid]
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 7200000) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            const q = {
      "key": {
        "remoteJid": "status@broadcast",
        "participant": "0@s.whatsapp.net",
        "fromMe": false,
        "id": ""
      },
      "message": {
        "conversation": "Successfull Backup User Database."
      }
            }
            let data = fs.readFileSync('./database.json')
            this.sendMessage('120363158911429150@g.us', { document: data, mimetype: 'application/json', fileName: 'database.json' }, { quoted: q })
            setting.backupDB = new Date() * 1
        }
    }
    return !0
}