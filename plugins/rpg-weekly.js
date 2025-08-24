const rewards = {
  exp: 15000,
  money: 35999,
  potion: 9,
}
const cooldown = 604800000
let handler = async (m, { usedPrefix }) => {
  
  let user = global.db.data.users[m.sender]
  let imgr = flaaa.getRandom()
  if (new Date - user.lastweekly < cooldown) return m.reply(`ʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ ᴄʟᴀɪᴍᴇᴅ *ᴡᴇᴇᴋʟʏ ʀᴇᴡᴀʀᴅꜱ*, ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ꜰɪɴɪꜱʜ.\n\n${((user.lastweekly + cooldown) - new Date()).toTimeString()}`)
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  m.reply(text.trim())
  user.lastweekly = new Date * 1
}
handler.help = ['weekly']
handler.tags = ['rpg']
handler.command = /^(weekly)$/i
handler.register = true
handler.group = true
handler.cooldown = cooldown
handler.rpg = true
export default handler