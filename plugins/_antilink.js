const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const ChRegex = /whatsapp\.com\/channel\/[A-Za-z0-9]+/i
const WaLinkRegex = /wa.me\/([0-9])/i

export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)
  let ischLink = ChRegex.exec(m.text)
  let isLinkWa = WaLinkRegex.exec(m.text)

  if (chat.antiLinkkick && m.isGroup) {
    if (isGroupLink && !isAdmin) {
      if (isBotAdmin) {
        const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
        if (m.text.includes(linkThisGroup)) return !0
      }
      if (chat.teks) {
        m.reply(`_*‼️Link Group Terdeteksi!*_ ${chat.pembatasan ? '\n_pesan kamu akan di hapus! ❌_': '\n_pesan kamu akan dihapus dan kamu akan dikick! ❌_'} ${isBotAdmin ? '': '\n\n_❬Bot Bukan Admin❭_'}`)
      }
      if (isBotAdmin && !chat.pembatasan) {
        await conn.sendMessage(m.chat, { delete: m.key })
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      } else if (chat.pembatasan && isBotAdmin) {
        conn.sendMessage(m.chat, { delete: m.key })
      }
    }
  } else if (chat.antiLinkWa && m.isGroup) {
    if (isLinkWa && !isAdmin) {
      if (chat.teks) {
        m.reply(`_*‼️ Link Whatsapp Terdeteksi!*_ ${chat.pembatasan ? '\n_pesan kamu akan di hapus! ❌_': '\n_pesan kamu akan dihapus dan kamu akan dikick! ❌_'} ${isBotAdmin ? '': '\n\n_❬Bot Bukan Admin❭_'}`)
      }
      if (isBotAdmin && !chat.pembatasan) {
        await conn.sendMessage(m.chat, { delete: m.key })
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      } else if (chat.pembatasan && isBotAdmin) {
        conn.sendMessage(m.chat, { delete: m.key })
      }
    }
  } else if (chat.antiLinkdelete && m.isGroup) {
    if (isGroupLink && !isAdmin) {
      if (isBotAdmin) {
        const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
        if (m.text.includes(linkThisGroup)) return !0
      }
      if (chat.teks) {
        m.reply(`_*‼️Link Group Terdeteksi!*_ ${chat.pembatasan ? '\n_pesan kamu akan di hapus! ❌_': '\n_pesan kamu akan dihapus! ❌_'} ${isBotAdmin ? '': '\n\n_❬Bot Bukan Admin❭_'}`)
      }
      if (isBotAdmin && !chat.pembatasan) {
        await conn.sendMessage(m.chat, { delete: m.key })
      } else if (chat.pembatasan && isBotAdmin) {
        conn.sendMessage(m.chat, { delete: m.key })
      }
    }
  }
  return
}