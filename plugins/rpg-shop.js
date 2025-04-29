import fs from "fs"
const items = {
    buy: {
        limit: {
            exp: 100000
        },
        chip: {
        	money: 1000000
        },
        exp: {
        	money: 1000
        },
        potion: {
            money: 1250
        },
        trash: {
            money: 40
        },
        wood: {
            money: 700
        },
        rock: {
            money: 850
        },
        string: {
            money: 400
        },
        iron: { 
        	money: 3000
        },
        diamond: {
            money: 500000
        },
        emerald: {
            money: 100000
        },
        gold: {
            money: 100000
        },
        common: {
            money: 2000
        },
        uncommon: {
            money: 20000
        },
        mythic: {
            money: 75000
        },
        legendary: {
            money: 200000
        },
        petfood: {
            money: 3500
        },
        pet: {
            money: 120000
        },
        anggur: {
            money: 2000
        },
        apel: {
            money: 2000
        },
        jeruk: {
            money: 2000
        },
        mangga: {
            money: 2000
        },
        pisang: {
        	money: 2000
        },
        bibitanggur: {
            money: 2000
        },
        bibitapel: {
            money: 2000
        },
        bibitjeruk: {
            money: 2000
        },
        bibitmangga: {
            money: 2000
        },
        bibitpisang: {
            money: 2000
        },
        umpan: {
        	money: 5000
        }     
    },
    sell: {
        limit: {
            exp: 100
        },
        exp: {
        	money: 1
        },
        chip: {
        	money: 1000000
        },
        potion: {
            money: 625
        },
        trash: {
            money: 20
        },
        wood: {
            money: 350
        },
        rock: {
            money: 425
        },
        string: {
            money: 200
        },
        iron: { 
        	money: 1500
        },
        diamond: {
            money: 250000
        },
        emerald: {
            money: 50000
        },
        gold: {
            money: 50000
        },
        common: {
            money: 1000
        },
        uncommon: {
            money: 10000
        },
        mythic: {
            money: 37500
        },
        legendary: {
            money: 100000
        },
        petfood: {
            money: 1750
        },
        pet: {
            money: 60000
        },
        anggur: {
            money: 1000
        },
        apel: {
            money: 1000
        },
        jeruk: {
            money: 1000
        },
        mangga: {
            money: 1000
        },
        pisang: {
        	money: 1000
        },
        bibitanggur: {
            money: 1000
        },
        bibitapel: {
            money: 1000
        },
        bibitjeruk: {
            money: 1000
        },
        bibitmangga: {
            money: 1000
        },
        bibitpisang: {
            money: 1000
        },
        umpan: {
        	money: 2500
        }
    }
}

let handler = async (m, { command, usedPrefix, args }) => {
    const item = (args[0] || '').toLowerCase()
    if (!item.match('limit') && db.data.chats[m.chat].rpg == false && m.isGroup) return dfail('rpg', m, conn)
    let user = db.data.users[m.sender]
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    let text = ''
    let footer = ''
    let image = ''
    let buttons = ''
    text = (command.toLowerCase() == 'buy' ?
(`
*${decor.htki} 𝙱𝚄𝚈𝙸𝙽𝙶 ${decor.htka}*
`.trim()) : 
(`
*${decor.htki} 𝚂𝙴𝙻𝙻𝙸𝙽𝙶 ${decor.htka}*
`.trim())
)
    footer = (command.toLowerCase() == 'buy' ?
(`
🛒 List Items :
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `➠ 1 ${rpg.emoticon(v)} ${capitalize(v)} ﹫ ${listItems[v][paymentMethod]} ${rpg.emoticon(paymentMethod)}${capitalize(paymentMethod)}`.trim()
    }).join('\n')}
–––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
➠ ᴛᴏ ʙᴜʏ ɪᴛᴇᴍs:
${usedPrefix}${command} [item] [quantity]
▧ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}${command} potion 10
`.trim()) : 
(`
🛒 List Items :
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `➠ 1 ${rpg.emoticon(v)} ${capitalize(v)} ﹫ ${listItems[v][paymentMethod]} ${rpg.emoticon(paymentMethod)}${capitalize(paymentMethod)}`.trim()
    }).join('\n')}
–––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
➠ ᴛᴏ sᴇʟʟ ɪᴛᴇᴍs:
${usedPrefix}${command} [item] [quantity]
▧ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}${command} potion 10
`.trim())
)
    
    const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (!listItems[item]) return m.reply(footer)
    if (command.toLowerCase() == 'buy') {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu membutuhkan *${(listItems[item][paymentMethod] * total) - user[paymentMethod]}* ${capitalize(paymentMethod)} ${rpg.emoticon(paymentMethod)} Lagi, Untuk Membeli *${total}* ${capitalize(item)} ${rpg.emoticon(item)}. Kamu hanya memiliki *${user[paymentMethod]}* ${capitalize(paymentMethod)} ${rpg.emoticon(paymentMethod)}.`)
        user[paymentMethod] -= listItems[item][paymentMethod] * total
        user[item] += total
        return conn.reply(m.chat, `Sukses Membeli *${total} ${capitalize(item)} ${rpg.emoticon(item)}*, Seharga *${listItems[item][paymentMethod] * total} ${capitalize(paymentMethod)} ${rpg.emoticon(paymentMethod)}*`, m)
    } else {
    	let paymentMethot = Object.keys(listItems[item]).find(v => v in user)
        if (user[item] < total) return m.reply(`You don't have enough *${capitalize(item)} ${rpg.emoticon(item)}* to sell, you only have ${user[item]} items`)
        user[item] -= total
        user[paymentMethot] += listItems[item][paymentMethot] * total
        return conn.reply(m.chat,`Sukses Menjual *${total} ${capitalize(item)} ${rpg.emoticon(item)}*, Seharga *${listItems[item][paymentMethot] * total} ${capitalize(paymentMethot)} ${rpg.emoticon(paymentMethot)}*`, m)
    }
}

handler.help = ['buy', 'sell'].map(v => v + ' <item> <count>')
handler.tags = ['rpg']
handler.command = /^(buy|sell)$/i
handler.register = true
handler.group = true
handler.disabled = false

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1)
}