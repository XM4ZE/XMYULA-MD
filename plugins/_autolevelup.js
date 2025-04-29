import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import moment from 'moment-timezone'

const MAX_LEVEL = 100

export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    
    if (!(m.isGroup && chat.autolevelup && !chat.isBanned) || user.level >= MAX_LEVEL) {
        return true
    }

    if (canLevelUp(user.level, user.exp, global.multiplier)) {
        let before = user.level * 1
        
        while (canLevelUp(user.level, user.exp, global.multiplier) && user.level < MAX_LEVEL) {
            user.level++
        }

        if (before !== user.level) {
            let teks = `.             ${user.role}`
            let str = `
*🎉 LEVEL UP! 🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]

${user.level === MAX_LEVEL ? 
'🌟 *MAX LEVEL ACHIEVED!* 🌟' : 
'Teruskan interaksi untuk naik level!'}

${getGreeting()} ${conn.getName(m.sender)}!
`.trim()

            try {
                const img = await levelup(teks, user.level)
                await conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
                
                if (user.level === MAX_LEVEL) {
                    user.money += 10000000
                    user.limit += 50
                    await conn.sendMessage(m.chat, {
                        text: `🎁 HADIAH: +10,000,000 Money & +50 Limit!`,
                        mentions: [m.sender]
                    })
                }
            } catch (e) {
                console.error('Error level up:', e)
                await conn.sendMessage(m.chat, { text: str })
            }
        }
    }
    return true
}

function getGreeting() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    if (time >= 4 && time < 11) return 'Selamat Pagi'
    if (time >= 11 && time < 15) return 'Selamat Siang'
    if (time >= 15 && time < 18) return 'Selamat Sore'
    return 'Selamat Malam'
}