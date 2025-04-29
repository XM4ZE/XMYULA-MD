let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole/i // tambahin sendiri
export async function before(m, { isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return 
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let isBadword = badwordRegex.exec(m.text)
    if (chat.antiBadword && isBadword && m.isGroup) {
        user.warn += 1
        m.reply(`${user.warning >= 5 ? '*📮 Warning Kamu Sudah Mencapai 5 Maka Kamu Akan Dikick!*' : '*📮 Kata Kata Toxic Terdeteksi*'}

${global.info.namebot} Memberi Peringatan: ${user.warn} / 5

[❗] Jika *${global.info.namebot}* sudah memperingatkanmu sebanyak 5x. Kamu akan dikeluarkan dari group ini.

“ Tch... Diam kamu bocah brengsek ! ! !`)
        if (user.warn >= 5) {
            user.warn = 0
            conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }
    }
    return !0
}