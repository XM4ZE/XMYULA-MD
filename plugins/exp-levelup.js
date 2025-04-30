import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import moment from 'moment-timezone'

const MAX_LEVEL = 100 // Set your maximum level here

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]

    if (!(m.isGroup && !chat.isBanned) || user.level >= MAX_LEVEL) {
        m.reply(`
🏆 *LEVEL MAXIMUM REACHED!* 🏆
You've achieved the highest level (${MAX_LEVEL})!
        
Want more challenges? Stay tuned for prestige system!
`.trim())
        return true
    }
    

    // Original level up logic
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        return m.reply(`
Level ${user.level} 📊
*${user.exp - min} / ${xp}*
Need *${max - user.exp}* more XP to level up! ✨
`.trim())
    }

    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier) && user.level < MAX_LEVEL) user.level++
    
    if (before !== user.level) {
        let teks = `.             ${user.role}`
        let str = `
*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]

${user.level === MAX_LEVEL ? 
'🌟 *MAXIMUM LEVEL ACHIEVED!* 🌟\nYou are now among the elite!' : 
'Note: _Interact more with bot to level up faster_'}

${wish()} ${conn.getName(m.sender)}!
`.trim()

        try {
            let img = await levelup(teks, user.level)
            await conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
            
            // Special reward for reaching max level
            if (user.level === MAX_LEVEL) {
                user.money += 10000000
                user.limit += 50
                await m.reply(`💎 BONUS: +10,000,000 Money & +50 Limit!`)
            }
        } catch (e) {
            console.error(e)
            let img = await levelup(teks, user.level)
            await conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['xp']
handler.command = /^level(|up)$/i
handler.register = true
export default handler

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    if (time >= 0) wishloc = 'Selamat Malam'
    if (time >= 4) wishloc = 'Selamat Pagi'
    if (time >= 11) wishloc = 'Selamat Siang'
    if (time >= 15) wishloc = 'Selamat Sore'
    if (time >= 18) wishloc = 'Selamat Malam'
    if (time >= 23) wishloc = 'Selamat Malam'
    return wishloc
}