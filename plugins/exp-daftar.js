import { createHash } from 'crypto'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import fs from 'fs'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { text, usedPrefix, command }) {
    function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)]
    }
    let namae = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, {
        weekday: 'long'
    })
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
    let user = global.db.data.users[m.sender]
    if (user.registered === true) throw `[💬] You are already registered\nWant to re-register? *${usedPrefix}unreg <SERIAL NUMBER>*`
    if (!Reg.test(text)) return m.reply(`Please Type:\n${usedPrefix + command} Name.Age\n\nExample:\n${usedPrefix + command} Maximus.19`)
    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('Your name cannot be empty. Please enter your name')
    if (!age) return m.reply('Your age cannot be empty. Please enter your age')
    age = parseInt(age)
    if (age > 70) return m.reply('You are too old')
    if (age < 5) return m.reply('Small children are prohibited from using bots')
    if (name.split('').length > 100) return m.reply('Nama Maksimal 100 Karakter Ajg')
    user.name = name.trim()
    user.age = age
    user.regTime = + new Date
    user.registered = true
    let sn = createHash('md5').update(m.sender).digest('hex')
    let cap = `\`\`\`USER INFORMATION\`\`\`
————————————————————
*Name:* ${name}
*Age:* ${age} Years

*Serial Number* 
${sn}
————————————————————

Thank you for registering. To access 
ALL MENU please write *.allmenu*
`
    await conn.sendMessage(m.chat, { video:
            { url: "https://github.com/XM4ZE/DATABASE/raw/master/wallpaper/Vid_20240614_012416.mp4?raw=true" },
            gifPlayback: true,
            gifAttribution: null,
            caption: cap.trim(),
            contextInfo: {
              mentionedJid: [m.sender]
            },
          }, { quoted: m })
}
handler.help = ['daftar']
handler.tags = ['xp']
handler.command = /^(daftar|verify|reg(ister)?)$/i

export default handler