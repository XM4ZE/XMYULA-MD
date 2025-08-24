import { readdirSync, rmSync } from 'fs'
export async function all(m) {
    let setting = global.db.data.settings[this.user.jid]
    if (setting.cleartmp) {
        if (new Date() * 1 - setting.lastcleartmp > 600000) {
            const dir = './tmp'
            readdirSync(dir).forEach(f => rmSync(`${dir}/${f}`));
            setting.lastcleartmp = new Date() * 1
        }
    } return !0
}