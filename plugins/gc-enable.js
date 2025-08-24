import moment from 'moment-timezone'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let bot = global.db.data.settings[conn.user.jid] || {}
    let name = `${user.registered ? user.name : conn.getName(m.sender)}`
    let type = (args[0] || '').toLowerCase()
    let isAll = false, isUser = false
    
    // Function to get status symbol
    const getStatus = (value) => value ? '〔 ✓ 〕' : '〔 ✘ 〕'

let caption = `
\`PENGATURAN GRUP\`

*[ SECURITY ]*
${getStatus(chat.antiLinkkick)} antilinkkick
   › Auto-kick members who send links group
   › Aktifkan: .enable antilinkkick
   › Nonaktifkan: .disable antilinkkick

${getStatus(chat.antiLinkdelete)} antilinkdelete
   › Delete messages containing links group
   › Aktifkan: .enable antilinkdelete
   › Nonaktifkan: .disable antilinkdelete

${getStatus(chat.antiLinkWa)} antilinkwa
   › Block WhatsApp users links
   › Aktifkan: .enable antilinkwa
   › Nonaktifkan: .disable antilinkwa

${getStatus(chat.antiTagSW)} antitagsw
   › Prevent tagging status in group
   › Aktifkan: .enable antitagsw
   › Nonaktifkan: .disable antitagsw

${getStatus(chat.antiPorn)} antiporn
   › Filter adult content
   › Aktifkan: .enable antiporn
   › Nonaktifkan: .disable antiporn

${getStatus(chat.antiAcara)} antiacara
   › Block event messages
   › Aktifkan: .enable antiacara
   › Nonaktifkan: .disable antiacara

${getStatus(chat.antiDoc)} antifile
   › Restrict document messages
   › Aktifkan: .enable antifile
   › Nonaktifkan: .disable antifile

${getStatus(chat.antiAudio)} antiaudio
   › Restrict audio messages
   › Aktifkan: .enable antiaudio
   › Nonaktifkan: .disable antiaudio

${getStatus(chat.antiFoto)} antifoto
   › Restrict photo messages
   › Aktifkan: .enable antifoto
   › Nonaktifkan: .disable antifoto

${getStatus(chat.antiPolling)} antipolling
   › Restrict polling messages
   › Aktifkan: .enable antipolling
   › Nonaktifkan: .disable antipolling

${getStatus(chat.antiVideo)} antivideo
   › Restrict video messages
   › Aktifkan: .enable antivideo
   › Nonaktifkan: .disable antivideo

${getStatus(chat.antiToxic)} antitoxic
   › Block toxic words
   › Aktifkan: .enable antitoxic
   › Nonaktifkan: .disable antitoxic

${getStatus(chat.antiBadword)} antibadword
   › Block bad words
   › Aktifkan: .enable antibadword
   › Nonaktifkan: .disable antibadword

${getStatus(chat.antiDelete)} antidelete
   › Prevent message deletion
   › Aktifkan: .enable antidelete
   › Nonaktifkan: .disable antidelete

${getStatus(chat.viewonce)} antiviewonce
   › Block view-once messages
   › Aktifkan: .enable antiviewonce
   › Nonaktifkan: .disable antiviewonce

${getStatus(chat.antiSticker)} antisticker
   › Block sticker messages
   › Aktifkan: .enable antisticker
   › Nonaktifkan: .disable antisticker

${getStatus(chat.antiStickerPack)} antistickerpack
   › Block sticker pack share
   › Aktifkan: .enable antistickerpack
   › Nonaktifkan: .disable antistickerpack

${getStatus(chat.antiVirtex)} antivirtex
   › Block text bomb / virtex
   › Aktifkan: .enable antivirtex
   › Nonaktifkan: .disable antivirtex

*[ GROUP FEATURES ]*
${getStatus(chat.simi)} simi
   › Enable AI chat
   › Aktifkan: .enable simi
   › Nonaktifkan: .disable simi

${getStatus(chat.teks)} teks
   › Enable text-only mode
   › Aktifkan: .enable teks
   › Nonaktifkan: .disable teks

${getStatus(chat.restrict)} restrict
   › Restrict admin-only features
   › Aktifkan: .enable restrict
   › Nonaktifkan: .disable restrict

${getStatus(chat.game)} game
   › Enable games
   › Aktifkan: .enable game
   › Nonaktifkan: .disable game

${getStatus(chat.allfitur)} allfitur
   › Enable all features at once
   › Aktifkan: .enable allfitur
   › Nonaktifkan: .disable allfitur

${getStatus(chat.rpg)} rpg
   › Enable RPG mode
   › Aktifkan: .enable rpg
   › Nonaktifkan: .disable rpg

${getStatus(chat.nsfw)} nsfw
   › Allow NSFW content
   › Aktifkan: .enable nsfw
   › Nonaktifkan: .disable nsfw

${getStatus(chat.welcome)} welcome
   › Welcome new members
   › Aktifkan: .enable welcome
   › Nonaktifkan: .disable welcome

${getStatus(chat.autolevelup)} autolevelup
   › Auto level up members
   › Aktifkan: .enable autolevelup
   › Nonaktifkan: .disable autolevelup

\`PENGATURAN BOT\`

*[ AUTOMATION ]*
${getStatus(bot.autobackup)} autobackup
   › Auto backup database
   › Aktifkan: .enable autobackup
   › Nonaktifkan: .disable autobackup

${getStatus(bot.autocleartmp)} autocleartmp
   › Clear temp files automatically
   › Aktifkan: .enable autocleartmp
   › Nonaktifkan: .disable autocleartmp

${getStatus(bot.autoresetlimit)} autoresetlimit
   › Auto reset user limits daily
   › Aktifkan: .enable autoresetlimit
   › Nonaktifkan: .disable autoresetlimit

${getStatus(bot.autoread)} autoread
   › Auto mark messages as read
   › Aktifkan: .enable autoread
   › Nonaktifkan: .disable autoread

${getStatus(bot.composing)} composing
   › Show typing indicator
   › Aktifkan: .enable composing
   › Nonaktifkan: .disable composing

*[ MODE ]*
${getStatus(global.opts['gconly'])} gconly
   › Respond only in groups
   › Aktifkan: .enable gconly
   › Nonaktifkan: .disable gconly

${getStatus(global.opts['pconly'])} pconly
   › Respond only in private chat
   › Aktifkan: .enable pconly
   › Nonaktifkan: .disable pconly

${getStatus(!global.opts['self'])} public
   › Public mode (anyone can use bot)
   › Aktifkan: .enable public
   › Nonaktifkan: .disable public

${getStatus(global.opts['self'])} self
   › Private mode (owner only)
   › Aktifkan: .enable self
   › Nonaktifkan: .disable self

${getStatus(global.opts['swonly'])} swonly
   › Respond only to status
   › Aktifkan: .enable swonly
   › Nonaktifkan: .disable swonly

${getStatus(bot.anticall)} anticall
   › Block all incoming calls
   › Aktifkan: .enable anticall
   › Nonaktifkan: .disable anticall

${getStatus(bot.menu2)} menu2
   › Alternate menu style
   › Aktifkan: .enable menu2
   › Nonaktifkan: .disable menu2

*Contoh penggunaan:*
.enable welcome - Aktifkan fitur welcome
.disable nsfw - Nonaktifkan NSFW
.settings - Lihat pengaturan saat ini
`.trim()


    switch (type) {
        case 'welcome':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.welcome = isEnable
            break
            
        case 'autolevelup':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.autolevelup = isEnable
            break
            
        case 'detect':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.detect = isEnable
            break
            
        case 'antiviewonce':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.viewonce = isEnable
            break
            
        case 'antidelete':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.delete = !isEnable
            break
            
        case 'teks':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.teks = isEnable
            break
            
        case 'antitagsw':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiTagSW = isEnable
            break
            
        case 'public':
        case 'self':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['self'] = !isEnable
            break
            
        case 'antilinkkick':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLinkkick = isEnable
            break
            
        case 'antilinkdelete':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLinkdelete = isEnable
            break
            
        case 'antilinkwa':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLinkWa = isEnable
            break
            
        case 'antiporn':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiPorn = isEnable
            break
            
        case 'antifoto':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiFoto = isEnable
            break
            
        case 'antiaudio':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiAudio = isEnable
            break
            
        case 'antiacara':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiAcara = isEnable
            break
            
        case 'antifile':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiDoc = isEnable
            break
            
        case 'antivideo':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiVideo = isEnable
            break
            
        case 'antipolling':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiPolling = isEnable
            break
            
        case 'nsfw':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.nsfw = isEnable
            break
            
        case 'rpg':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.rpg = isEnable
            break
            
        case 'allfitur':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.xmaze = isEnable
            break
            
        case 'antivirtex':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiVirtex = isEnable
            break
            
        case 'simi':
            if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
            }
            chat.simi = isEnable
            break
            
        case 'composing':
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            bot.composing = isEnable
            break
            
        case 'antisticker':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiSticker = isEnable
            break
            
        case 'antistickerpack':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiStickerPack = isEnable
            break
            
        case 'antibadword':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiBadword = isEnable
            break
            
        case 'antitoxic':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiToxic = isEnable
            break
            
        case 'restrict':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.pembatasan = isEnable
            break
            
        case 'game':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.game = isEnable
            break
            
        case 'anticall':
            if (!isOwner) {
                global.dfail('owner', m, conn)
                throw false
            }
            bot.anticall = isEnable
            break
            
        case 'menu2':
            if (!isOwner) {
                global.dfail('owner', m, conn)
                throw false
            }
            bot.thumbnail = isEnable
            break
            
        case 'autobackup':
            isAll = true
            if (!isOwner) {
                global.dfail('owner', m, conn)
                throw false
            }
            bot.backup = isEnable
            break
            
        case 'autocleartmp':
            isAll = true
            if (!isOwner) {
                global.dfail('owner', m, conn)
                throw false
            }
            bot.cleartmp = isEnable
            break
            
        case 'autoresetlimit':
            isAll = true
            if (!isOwner) {
                global.dfail('owner', m, conn)
                throw false
            }
            bot.resetlimit = isEnable
            break
            
        case 'autoread':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            bot.autoread = isEnable
            break
            
        case 'pconly':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['pconly'] = isEnable
            break
            
        case 'gconly':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['gconly'] = isEnable
            break
            
        case 'swonly':
            isAll = true
            if (!isROwner) {
                global.dfail('rowner', m, conn)
                throw false
            }
            global.opts['swonly'] = isEnable
            break
            
        default:
            return m.reply(caption)
    }
    
    await m.reply(`✅ *${type.toUpperCase()}* telah ${isEnable ? 'di *Hidupkan*' : 'di *Matikan*'} ${isAll ? 'untuk bot ini' : 'dalam obrolan ini'}!`)
}

handler.help = ['enable <command>', 'disable <command>']
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|settings?|seting)$/i

export default handler

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    
    if (time >= 0 && time < 4) wishloc = 'Selamat Malam'
    else if (time >= 4 && time < 11) wishloc = 'Selamat Pagi'
    else if (time >= 11 && time < 15) wishloc = 'Selamat Siang'
    else if (time >= 15 && time < 18) wishloc = 'Selamat Sore'
    else wishloc = 'Selamat Malam'
    
    return wishloc
}